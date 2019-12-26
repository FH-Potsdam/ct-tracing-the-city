#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

echo "copying libraries to 'libs' folder"
cp node_modules/p5/lib/p5.js ./libs/