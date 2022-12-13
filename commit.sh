#!/bin/sh
set -e

remote_repo="https://${GITHUB_USER}:${PERSONAL_ACCESS_TOKEN_FOR_GITHUB_API}@github.com/${REPOSITORY_NAME}.git"

git config http.sslVerify false
git config --local user.email "simple-lead-time-action"
git config --local user.name "simple-lead-time-action"
git add -A
git commit -m "auto commit by simple-lead-time-action"
echo 'git commited'
git push "${remote_repo}" HEAD:"${SAVE_HISTORY_FILE_BRANCH}";
echo 'git pushed'
