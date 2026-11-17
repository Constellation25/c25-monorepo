#!/data/data/com.termux/files/usr/bin/bash
cd "$(dirname "$0")"; P=${PORT:-8080}
if command -v node >/dev/null; then PORT=$P node c25-serve.cjs; else python3 -m http.server $P; fi
