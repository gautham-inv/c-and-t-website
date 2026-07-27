#!/usr/bin/env python3
"""
Division hero frame extraction
------------------------------
Turns public/<video>.mp4 into a numbered WebP frame sequence under
public/division-frames/<slug>/, which components/divisions/DivisionHero.tsx
scrubs against scroll position.

WHY FRAMES AND NOT THE VIDEO
  Scrubbing a compressed video by setting `currentTime` depends on the codec's
  keyframe interval and is unreliable/stuttery across browsers (notably older
  Safari/iOS). A frame sequence is frame-accurate everywhere. The cost is size:
  video codecs only encode what changes between frames, so standalone stills
  lose all that temporal compression and the sequence ends up several times
  larger than the source clip. That trade was made deliberately — see the
  preloader in DivisionHero.tsx, which keeps the page usable while it fills.

ENCODER NOTE
  The local ffmpeg build has no libwebp, so ffmpeg extracts PNG and Pillow does
  the WebP encode. Frames are processed in parallel and the PNG scratch dir is
  removed afterwards.

RUN
  python3 scripts/extract_hero_frames.py            # all configured videos
  python3 scripts/extract_hero_frames.py building   # just one
"""

import os
import shutil
import subprocess
import sys
import tempfile
from concurrent.futures import ProcessPoolExecutor

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
OUT_ROOT = os.path.join(PUBLIC, "division-frames")

# Width the frames are encoded at. The hero is a full-bleed background sitting
# behind a dark overlay and the headline, so detail beyond this is not visible
# — but it is the single biggest lever on total payload if it needs revisiting.
WIDTH = 1440
QUALITY = 75

# video file (in /public) -> division slug (the /divisions/[slug] route)
VIDEOS = {
    "building.mp4": "building",
    "oil.mp4": "oil-and-gas",
}


def encode(args):
    src, dst = args
    with Image.open(src) as im:
        im = im.convert("RGB")
        h = round(im.height * WIDTH / im.width / 2) * 2
        im = im.resize((WIDTH, h), Image.LANCZOS)
        im.save(dst, "WEBP", quality=QUALITY, method=6)
    return os.path.getsize(dst)


def process(video: str, slug: str) -> None:
    src = os.path.join(PUBLIC, video)
    if not os.path.exists(src):
        print(f"  ! {video} not found, skipping")
        return

    out_dir = os.path.join(OUT_ROOT, slug)
    # Rebuild from scratch so a re-run after a video swap can't leave orphaned
    # higher-numbered frames behind (which would desync the scrub range).
    if os.path.isdir(out_dir):
        shutil.rmtree(out_dir)
    os.makedirs(out_dir, exist_ok=True)

    tmp = tempfile.mkdtemp(prefix=f"frames-{slug}-")
    try:
        print(f"\n{video} -> public/division-frames/{slug}/")
        subprocess.run(
            ["ffmpeg", "-v", "error", "-i", src, "-vsync", "0",
             os.path.join(tmp, "%04d.png")],
            check=True,
        )
        pngs = sorted(f for f in os.listdir(tmp) if f.endswith(".png"))
        jobs = [
            (os.path.join(tmp, p), os.path.join(out_dir, f"{i + 1:04d}.webp"))
            for i, p in enumerate(pngs)
        ]

        total = 0
        with ProcessPoolExecutor() as pool:
            for n, size in enumerate(pool.map(encode, jobs, chunksize=4), 1):
                total += size
                if n % 25 == 0 or n == len(jobs):
                    print(f"  {n}/{len(jobs)} frames  ({total / 1048576:.1f} MB)")

        print(f"  done: {len(jobs)} frames, {total / 1048576:.1f} MB "
              f"(avg {total / len(jobs) / 1024:.0f} KB), {WIDTH}px q{QUALITY}")
        print(f"  -> set count: {len(jobs)} for slug '{slug}' in DivisionHero config")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def main() -> None:
    wanted = sys.argv[1:]
    items = {v: s for v, s in VIDEOS.items() if not wanted or s in wanted or v in wanted}
    if not items:
        print(f"No match. Known: {', '.join(VIDEOS.values())}")
        sys.exit(1)
    for video, slug in items.items():
        process(video, slug)


if __name__ == "__main__":
    main()
