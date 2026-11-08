---
name: changelog
description: Update CHANGELOG.md in the project root from git history, grouped under date headings. Invoke manually before merging a branch.
---

# Changelog skill

Keeps `CHANGELOG.md` in the project root up to date. It is run by hand before a branch is merged.

## Format

```markdown
# Changelog

## YYYY-MM-DD
- Short, user-facing description of a change
```

- Newest date first.
- One `##` heading per date; bullets under it.
- Bullets describe *what changed for the project*, in plain language — not commit hashes, not "fix typo" noise.

## Steps

1. Run `python .claude/skills/changelog/scripts/changelog.py` to print commits grouped by date (merge commits are skipped). Pass `--since YYYY-MM-DD` to limit the range.
2. If `CHANGELOG.md` does not exist, create it with a bullet per meaningful commit for every date.
3. If it exists, add bullets only for commits not already covered; add a new date heading when needed.
4. Merge closely related commits into one bullet, and drop commits that only touch the changelog itself.
5. Show the diff of `CHANGELOG.md` to the user before committing it.
