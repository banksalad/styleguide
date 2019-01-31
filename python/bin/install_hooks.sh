#!/bin/sh
PROJECT_DIR=$(git rev-parse --show-toplevel)

ln -s $PROJECT_DIR/bin/pre-push $PROJECT_DIR/.git/hooks/pre-push
