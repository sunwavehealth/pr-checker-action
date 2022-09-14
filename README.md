# PR Checker

This will only run on pull_request event types.  When it does it will fetch all commits associated with the PR and check that they have the proper naming convention.

## Usage
```
on:
  pull_request:
    types: [opened, editied, reopened]

jobs:
  pr_checker_job:
    runs-on: ubuntu-latest
    name: PR Checker Job
    steps:
      - name: PR Checker
        id: pr-checker
        uses: sunwavehealth/pr-checker-action@v1.0.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          commit-message-format: '^\[[A-Z][A-Z0-9]+-[0-9]+\][ ][a-zA-Z].*'
```

## Building
This package requires NPM (8.11.0 used during development).  Simply run the following command to build the distribution at `dist` and be sure to check that in as well.
```
npm run build
```