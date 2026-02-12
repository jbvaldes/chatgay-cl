#!/bin/bash
DATE=$(date +%Y-%m-%d_%H%M%S)
docker-compose exec -t db pg_dumpall -c -U jorge_admin > /mnt/datos/Proyectos/chatgay-cl/data/backups/backup_$DATE.sql
echo "Backup completado: backup_$DATE.sql"
#!/bin/bash
# Script de Ingeniería de Datos para ChatGay.cl

BACKUP_DIR="./data/backups"
DATE=$(date +%Y-%m-%d_%H%M%S)

# Crear carpeta si no existe
mkdir -p $BACKUP_DIR

# Ejecutar el dump desde el contenedor Postgres
docker-compose exec -t db pg_dump -U jorge_admin chatgay_db > $BACKUP_DIR/backup_$DATE.sql

# Borrar backups más viejos de 7 días para no llenar el SSD
find $BACKUP_DIR -type f -name "*.sql" -mtime +7 -exec rm {} \;

echo "✅ Backup completado con éxito: $BACKUP_DIR/backup_$DATE.sql"
