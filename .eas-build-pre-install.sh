#!/bin/bash
set -e

echo "🧰 Activating Corepack and Yarn 4.10.3..."
corepack enable
corepack prepare yarn@4.10.3 --activate

echo "✅ Corepack and Yarn 4.10.3 ready."
