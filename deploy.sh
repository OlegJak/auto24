#!/bin/sh
# Publish to GitHub Pages with cache-busting.
# GitHub Pages serves everything with max-age=600, so phones keep old CSS/JS.
# This stamps every asset URL in the HTML with a fresh ?v=… before pushing.
# Usage: ./deploy.sh "commit message"
set -e
cd "$(dirname "$0")"
V=$(date +%Y%m%d%H%M%S)
sed -i '' -E "s#(assets/[A-Za-z0-9_-]+\.(js|css))(\?v=[0-9]+)?\"#\1?v=$V\"#g" *.html
git add -A
git commit -q -m "${1:-Update site} (v$V)" || true
git push -q origin main main:gh-pages
echo "Published v$V → https://olegjak.github.io/auto24/"
