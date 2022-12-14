#!/bin/sh
set -e

LEAD_TIME=$1
PR_LINK=$2
SAVE_HISTORY_FILE_BRANCH="simple-lead-time-action"

branch_count=`git ls-remote --heads origin ${SAVE_HISTORY_FILE_BRANCH} | wc -l | tr -d ' '`

if [ "0" = "$branch_count" ]; then
  echo 'init branch'
  git branch ${SAVE_HISTORY_FILE_BRANCH}
  git checkout ${SAVE_HISTORY_FILE_BRANCH}
  git push --set-upstream origin ${SAVE_HISTORY_FILE_BRANCH}
else
  echo 'skip branch'
  git pull
  git checkout ${SAVE_HISTORY_FILE_BRANCH}
fi
git branch

if [ -d "simple-lead-time-action" ]; then
  echo 'skip init history data file'
else
  echo 'init history data file'
  mkdir -p simple-lead-time-action
  echo "## simple-lead-time-action history" >> simple-lead-time-action/README.md
  echo "[See Document - simple-lead-time-action](https://github.com/marketplace/actions/simple-lead-time-action)" >> simple-lead-time-action/README.md
  echo "" >> simple-lead-time-action/README.md
  echo "| :four_leaf_clover: Release Date | :clock10: Lead Time | PR Link |" >> simple-lead-time-action/README.md
  echo "| ---- | ---- | ---- |" >> simple-lead-time-action/README.md
fi

echo "| `date +'%Y-%m-%d %H:%M'` | $LEAD_TIME | [PR Link]($PR_LINK) |" >> simple-lead-time-action/README.md

remote_repo="https://${GITHUB_USER}:${PERSONAL_ACCESS_TOKEN_FOR_GITHUB_API}@github.com/${REPOSITORY_NAME}.git"

git config http.sslVerify false
git config --local user.email "simple-lead-time-action"
git config --local user.name "simple-lead-time-action"
git add -A
git commit -m "auto commit by simple-lead-time-action"
echo 'git commited'
git push "${remote_repo}" HEAD:"${SAVE_HISTORY_FILE_BRANCH}" --force;
echo 'git pushed'
git pull
