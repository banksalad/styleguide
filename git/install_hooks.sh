#!/bin/bash

curl -o .github/workflows/pull-request-lint.yml \
     --create-dirs \
     https://raw.githubusercontent.com/banksalad/styleguide/git/workflows/pull-request-lint.yml
curl -o .git/hooks/prepare-commit-msg \
     --create-dirs \
     https://raw.githubusercontent.com/banksalad/styleguide/git/hooks/prepare-commit-msg
chmod +x .git/hooks/prepare-commit-msg
