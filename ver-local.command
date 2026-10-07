#!/bin/bash
# Doble clic (Mac) para ver la página en tu computadora.
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  echo "Falta Node.js. Instala la versión LTS desde https://nodejs.org y vuelve a abrir este archivo."
  open "https://nodejs.org"
else
  node scripts/ver-local.mjs
fi
echo; read -r -p "Pulsa Enter para cerrar esta ventana…"
