"""Assemble the self-contained owner review package in docs/owner-review/.

Copies every mock (rounds 1-4) into owner-review/mocks/<round>/, copies the
shared repo assets they reference into owner-review/assets/, and points each
mock's "all mocks" tag at the review index. index.html is hand-written and not
touched here. Run from the repo root:  python docs/tools/build_owner_review.py
"""
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / "docs"
OUT = DOCS / "owner-review"

ROUNDS = {
    "r1": (DOCS / "redesign-mocks", ["a-proof", "b-canvas", "c-loop", "d-sheet"]),
    "r2": (DOCS / "redesign-mocks-r2", ["r2a-record", "r2b-workfront", "r2c-model", "r2d-lifecycle"]),
    "r3": (DOCS / "redesign-mocks-r3", ["r3a-emblem", "r3b-ground", "r3c-thread", "r3d-clause"]),
    "r4": (DOCS / "redesign-mocks-r4", ["r4a-ground", "r4b-mark"]),
}

SHARED = re.compile(r"\.\./\.\./assets/([\w./-]+)")
LOCAL = re.compile(r"""(?:src|href)="(assets/[\w./-]+)\"""")


def main() -> None:
    mocks_out = OUT / "mocks"
    if mocks_out.exists():
        shutil.rmtree(mocks_out)
    if (OUT / "assets").exists():
        shutil.rmtree(OUT / "assets")

    shared: set[str] = {"favicon.svg"}
    for rnd, (src_dir, ids) in ROUNDS.items():
        dest = mocks_out / rnd
        dest.mkdir(parents=True)
        for mock_id in ids:
            html = (src_dir / f"{mock_id}.html").read_text(encoding="utf-8")
            shared.update(SHARED.findall(html))
            for rel in set(LOCAL.findall(html)):
                (dest / rel).parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src_dir / rel, dest / rel)
            # The mock tag's "all mocks" link: back to the review index, out of the viewer frame.
            html, n = re.subn(r'href="index\.html"', 'href="../../index.html" target="_top"', html)
            assert n == 1, f"{mock_id}: expected one index link, found {n}"
            (dest / f"{mock_id}.html").write_text(html, encoding="utf-8")

    for rel in sorted(shared):
        target = OUT / "assets" / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(ROOT / "assets" / rel, target)
    print(f"copied {sum(len(v[1]) for v in ROUNDS.values())} mocks, shared assets: {sorted(shared)}")


if __name__ == "__main__":
    main()
