from django.db import models

class RegistroAcceso(models.Model):
    ip_address = models.GenericIPAddressField()
    fecha_acceso = models.DateTimeField(auto_now_add=True)
    user_agent = models.TextField()  # Info del navegador/dispositivo
    acepto_terminos = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.ip_address} - {self.fecha_acceso}"

    class Meta:
        verbose_name = "Registro de Auditoría"
        verbose_name_plural = "Registros de Auditoría"