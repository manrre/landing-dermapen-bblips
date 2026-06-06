#!/usr/bin/env python
"""Verify one WAV file against a local ECAPA speaker profile."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

import numpy as np


def load_encoder() -> Any:
    try:
        from speechbrain.inference.speaker import EncoderClassifier
    except ImportError as exc:
        raise SystemExit(
            "Missing SpeechBrain dependencies. Install with: "
            "python -m pip install -r scripts/voice/requirements-voice.txt"
        ) from exc

    return EncoderClassifier.from_hparams(
        source="speechbrain/spkrec-ecapa-voxceleb",
        savedir="models/speechbrain-spkrec-ecapa-voxceleb",
    )


def embedding_for_file(encoder: Any, wav_path: Path) -> np.ndarray:
    embedding = encoder.encode_file(str(wav_path)).squeeze().detach().cpu().numpy()
    norm = np.linalg.norm(embedding)
    if norm == 0:
        raise ValueError(f"Zero-norm embedding for {wav_path}")
    return embedding / norm


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--profile", required=True)
    parser.add_argument("--wav", required=True)
    args = parser.parse_args()

    profile = json.loads(Path(args.profile).read_text(encoding="utf-8"))
    threshold = float(profile["threshold"])
    centroid = np.array(profile["centroid"], dtype=np.float32)
    centroid = centroid / np.linalg.norm(centroid)

    encoder = load_encoder()
    embedding = embedding_for_file(encoder, Path(args.wav))
    score = float(np.dot(embedding, centroid))
    authorized = score >= threshold

    print(
        json.dumps(
            {
                "status": "authorized" if authorized else "rejected",
                "speaker_verified": authorized,
                "user_id": profile["user_id"] if authorized else None,
                "score": score,
                "threshold": threshold,
                "model": profile.get("model", "speechbrain-ecapa-tdnn"),
            }
        )
    )


if __name__ == "__main__":
    main()
