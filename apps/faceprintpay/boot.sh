#!/data/data/com.termux/files/usr/bin/env bash
set -euo pipefail
echo "Booting FacePrintPay..."
python -m faceprintpay 2>/dev/null || python faceprintpay/*.py 2>/dev/null || echo "No bootable entry point"
