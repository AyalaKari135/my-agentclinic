"""Print git commits grouped by date, newest first, as a changelog draft."""
import argparse
import subprocess
from collections import OrderedDict


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--since", help="only commits on or after this date (YYYY-MM-DD)")
    args = parser.parse_args()

    cmd = ["git", "log", "--no-merges", "--date=short", "--pretty=format:%ad\t%s"]
    if args.since:
        cmd.append(f"--since={args.since}")
    out = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", check=True).stdout

    by_date: "OrderedDict[str, list[str]]" = OrderedDict()
    for line in out.splitlines():
        date, subject = line.split("\t", 1)
        by_date.setdefault(date, []).append(subject)

    for date, subjects in by_date.items():
        print(f"## {date}")
        for subject in subjects:
            print(f"- {subject}")
        print()


if __name__ == "__main__":
    main()
