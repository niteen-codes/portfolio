#!/bin/bash
# Scrub leaked credentials from git history
# Run this from Git Bash (not PowerShell)

FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --force --tree-filter '
if [ -f backend/src/main/resources/application.properties ]; then
  sed -i "s/haqfddznribddvaj/REDACTED/g" backend/src/main/resources/application.properties
  sed -i "s/spring\.mail\.username=niteenjha190@gmail\.com/spring.mail.username=REDACTED/g" backend/src/main/resources/application.properties
fi
' --prune-empty -- --all

# Clean up refs
git for-each-ref --format="delete %(refname)" refs/original/ | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "Done! Now run: git push origin main --force"
