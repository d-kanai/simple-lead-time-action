# simple-lead-time-action

## :four_leaf_clover: Motivation

we would like to know how long take time until release our commited code.

it's like lead-time in one of Four keys

## :four_leaf_clover: Definition of lead-time

- we have "release" branch
- we have "devlelop" branch
- we merge "develop" => "release" branch by PR when we deploy to production as usual

so that 
<br/>

### *:clock10: Lead Time = PR merged date - PR first commited date*

<br/>

## :four_leaf_clover: example action code

```
on:
  push:
    branches:
      - release

jobs:
  lead-time:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Find Lead Time
        id: lead-time
        uses: d-kanai/lead-time-action@main
        env:
          PERSONAL_ACCESS_TOKEN_FOR_GITHUB_API: ${{secrets.PERSONAL_ACCESS_TOKEN_FOR_GITHUB_API}}
          PR_BRANCH_TO: release
          PR_BRANCH_FROM: develop
          REPOSITORY_NAME: ${{github.repository}}
      - name: show lead-time output
        run: echo "${{ steps.lead-time.outputs.lead-time }}"
```

this action usualy trigger by "release" brnach push.

## :four_leaf_clover: env variables

you can set FROM => TO branch name by env variables liek above example code.
