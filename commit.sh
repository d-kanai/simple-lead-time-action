#!/bin/sh
set -e

timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

INPUT_BRANCH=${INPUT_BRANCH}
REPOSITORY=${INPUT_REPOSITORY:-$GITHUB_REPOSITORY}

echo "Push to branch $INPUT_BRANCH";
[ -z "${INPUT_GITHUB_TOKEN}" ] && {
    echo 'Missing input "github_token: ${{ secrets.GITHUB_TOKEN }}".';
    exit 1;
};

remote_repo="https://${GITHUB_USER}:${INPUT_GITHUB_TOKEN}@github.com/${REPOSITORY}.git"

git config http.sslVerify false
git config --local user.email "simple-lead-time-action"
git config --local user.name "simple-lead-time-action"

git add -A
git commit -m "auto commit by simple-lead-time-action"
echo 'hoge'
git push "${remote_repo}" HEAD:"${INPUT_BRANCH}";
echo 'DONE'
