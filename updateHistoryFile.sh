#!/bin/sh
set -e

LEAD_TIME=$1
PR_LINK=$2

not_exist_branch=$(git ls-remote --heads origin ${SAVE_HISTORY_FILE_BRANCH})

if [[ -z ${not_exist_branch} ]]; then
#  git branch -d ${SAVE_HISTORY_FILE_BRANCH}
  git branch ${SAVE_HISTORY_FILE_BRANCH}
  git checkout ${SAVE_HISTORY_FILE_BRANCH}
  git push --set-upstream origin ${SAVE_HISTORY_FILE_BRANCH}
else
  git checkout ${SAVE_HISTORY_FILE_BRANCH}
fi
git branch

if [ -d "simple-lead-time-action" ]; then
  echo 'skip init file'
else
  mkdir -p simple-lead-time-action
  echo "## simple-lead-time-action history" >> simple-lead-time-action/README.md
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
