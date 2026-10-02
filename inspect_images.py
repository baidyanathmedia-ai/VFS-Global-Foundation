import os
import glob
import re

print("=== IMAGE REFERENCES IN SRC ===")
src_files = glob.glob("src/**/*.{ts,tsx,js,jsx}", recursive=True)
for f in sorted(src_files):
    with open(f, "r") as fp:
        content = fp.read()
    matches = re.findall(r'/src/assets/images/[a-zA-Z0-9_\-\.]+', content)
    if matches:
        print(f"{f}:")
        for m in set(matches):
            print(f"  - {m}")
