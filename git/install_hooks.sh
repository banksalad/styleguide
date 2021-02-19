#!/bin/bash

curl -H "Authorization: token $GH_ACCESS_TOKEN" \
     -o .git/hooks/prepare-commit-msg \
     --create-dirs \
     https://raw.githubusercontent.com/banksalad/styleguide/git/hooks/prepare-commit-msg
chmod +x .git/hooks/prepare-commit-msg