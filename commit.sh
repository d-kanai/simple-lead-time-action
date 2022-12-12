#!/bin/sh
set -e

INPUT_BRANCH=${INPUT_BRANCH}
REPOSITORY=${INPUT_REPOSITORY:-$GITHUB_REPOSITORY}
remote_repo="https://${GITHUB_USER}:${INPUT_GITHUB_TOKEN}@github.com/${REPOSITORY}.git"

git config http.sslVerify false
git config --local user.email "simple-lead-time-action"
git config --local user.name "simple-lead-time-action"
git add -A
git commit -m "auto commit by simple-lead-time-action"
git push "${remote_repo}" HEAD:"${INPUT_BRANCH}";

echo 'DONE'
