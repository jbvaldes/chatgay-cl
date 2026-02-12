import logging
from .models import RegistroAcceso

logger = logging.getLogger('django')

class AuditoriaPDIMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # 1. Obtener la IP (manejando si hay proxies en el futuro)
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')

        # 2. Solo registrar si no es un archivo estático (imágenes/css)
        if not request.path.startswith('/static/'):
            RegistroAcceso.objects.create(
                ip_address=ip,
                user_agent=request.META.get('HTTP_USER_AGENT', 'Desconocido'),
                acepto_terminos=False
            )
            # También lo escribimos en el log físico de la Bodega
            logger.info(f"AUDITORIA PDI - IP: {ip} - RUTA: {request.path}")

        response = self.get_response(request)
        return response