#!/usr/bin/env python
"""Create a local speaker profile from WAV samples using SpeechBrain ECAPA.

This script intentionally writes profiles outside git-tracked source by default.
Input WAV files should be mono 16 kHz whenever possible.
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
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
    parser.add_argument("--user-id", required=True)
    parser.add_argument("--samples-dir", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--threshold", type=float, default=0.72)
    args = parser.parse_args()

    samples_dir = Path(args.samples_dir)
    wav_files = sorted(samples_dir.glob("*.wav"))
    if len(wav_files) < 3:
        raise SystemExit("Enrollment needs at least 3 WAV files for a smoke test.")

    encoder = load_encoder()
    embeddings = np.vstack([embedding_for_file(encoder, wav) for wav in wav_files])
    centroid = embeddings.mean(axis=0)
    centroid = centroid / np.linalg.norm(centroid)

    profile = {
        "user_id": args.user_id,
        "model": "speechbrain-ecapa-tdnn",
        "sample_count": len(wav_files),
        "threshold": args.threshold,
        "centroid": centroid.tolist(),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "samples": [str(path) for path in wav_files],
    }

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(profile, indent=2), encoding="utf-8")
    print(json.dumps({"status": "ready", "profile": str(output_path)}))


if __name__ == "__main__":
    main()
