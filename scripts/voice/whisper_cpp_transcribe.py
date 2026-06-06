#!/usr/bin/env python
"""Run whisper.cpp over an already authorized WAV file.

This wrapper assumes whisper.cpp is installed separately and receives the binary
path and model path explicitly.
"""

from __future__ import annotations

import argparse
import json
import subprocess


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--binary", required=True)
    parser.add_argument("--model", required=True)
    parser.add_argument("--wav", required=True)
    parser.add_argument("--language", default="es")
    args = parser.parse_args()

    completed = subprocess.run(
        [
            args.binary,
            "-m",
            args.model,
            "-f",
            args.wav,
            "-l",
            args.language,
            "-nt",
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    if completed.returncode != 0:
        print(
            json.dumps(
                {
                    "error": {
                        "code": "transcription_failed",
                        "message": completed.stderr.strip(),
                        "retryable": True,
                    }
                }
            )
        )
        raise SystemExit(completed.returncode)

    transcript = completed.stdout.strip()
    print(
        json.dumps(
            {
                "transcript": transcript,
                "language": args.language,
                "provider": "whisper-cpp",
                "model_name": args.model,
            }
        )
    )


if __name__ == "__main__":
    main()
