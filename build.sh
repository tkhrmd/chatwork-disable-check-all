#!/bin/bash

DIR="$(cd "$(dirname "$BASH_SOURCE")"; pwd)"

cd "${DIR}"

zip -r package.zip extension -x '*/.DS_Store'
