#!/bin/bash
echo "🚀 Iniciando infraestructura de ChatGay.cl..."
docker-compose up -d --build
echo "⏳ Esperando a que la base de datos despierte..."
sleep 5
echo "📦 Aplicando migraciones de Django..."
docker-compose exec web python src/manage.py migrate
echo "✅ ¡Todo listo! Accede en http://localhost:8000"
