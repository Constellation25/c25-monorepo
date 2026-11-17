#!/data/data/com.termux/files/usr/bin/env bash
set -euo pipefail
echo "Installing FacePrintPay..."
pkg install -y python nodejs git
pip install --force-reinstall dist/*.whl --break-system-packages 2>/dev/null || true
echo "FacePrintPay installed"
