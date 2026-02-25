import logging
from .models import AuditoriaPDI # Corregido para coincidir con tu modelo de seguridad

logger = logging.getLogger('django')

class AuditoriaPDIMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # 1. Obtener la IP (manejando si hay proxies o balanceadores en GCP)
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')

        # 2. Solo registrar si no es un archivo estático (imágenes/css) o el admin
        if not request.path.startswith('/static/') and not request.path.startswith('/bodega-secreta'):
            try:
                # Usamos el modelo AuditoriaPDI que definimos en models.py
                AuditoriaPDI.objects.create(
                    ip_address=ip,
                    user_agent=request.META.get('HTTP_USER_AGENT', 'Desconocido'),
                    path_visitado=request.path
                )
                # También lo escribimos en el log físico de la Bodega (GCP Log)
                logger.info(f"AUDITORIA PDI - IP: {ip} - RUTA: {request.path}")
            except Exception as e:
                # Si la DB falla, el log físico es nuestro respaldo
                logger.error(f"FALLO DB AUDITORIA: {e}")

        response = self.get_response(request)
        return response
