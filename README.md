# simple-lead-time-action

## :four_leaf_clover: Motivation

How long take time until release our commited code?

it's like lead-time in one of Four keys

## :four_leaf_clover: Definition of lead-time

- you have "release" branch
- you have "devlelop" branch
- you merge "develop" => "release" branch by PR when we deploy to production as usual

<br/>

### *:clock10: Lead Time = PR merged date - PR first commited date*

<br/>

## :four_leaf_clover: Example of result
![image](https://user-images.githubusercontent.com/97098139/207061911-939e415e-8845-444f-af99-23c16ad3a1fc.png)

this PR code spent "6 hours" until deliver to prodcution.

## :four_leaf_clover: Example action code

```
on:
  push:
    branches:
      - main

jobs:
  lead-time:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Find Lead Time
        id: lead-time
        uses: d-kanai/lead-time-action@develop
        env:
          PERSONAL_ACCESS_TOKEN_FOR_GITHUB_API: ${{secrets.PERSONAL_ACCESS_TOKEN_FOR_GITHUB_API}}
          REPOSITORY_NAME: ${{github.repository}}
          ENABLE_SAVE_HISTORY_FILE: true
          GITHUB_USER: d-kanai
          RELEASE_BRANCH_NAME: main

      - name: Show lead-time output
        run: echo "${{ steps.lead-time.outputs.lead-time }}"

      - name: Show history-link output
        run: echo "${{ steps.lead-time.outputs.history-link }}"
```

this action usualy trigger by "release" branch push.

## :four_leaf_clover: Env variables

you can set FROM => TO branch name by env variables liek above example code.

