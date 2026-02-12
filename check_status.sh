#!/bin/bash
# Monitor de Salud - ChatGay.cl
# Jorge 2026

TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
STATUS=$(docker compose ps --format json)

echo "[$TIMESTAMP] Auditando contenedores..." >> data/logs/infra_status.log
docker compose ps >> data/logs/infra_status.log
echo "------------------------------------" >> data/logs/infra_status.log

echo "✅ Estado guardado en data/logs/infra_status.log"
