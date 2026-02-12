from django.contrib import admin
from .models import RegistroAcceso

@admin.register(RegistroAcceso)
class RegistroAccesoAdmin(admin.ModelAdmin):
    # Columnas que verás en la lista
    list_display = ('ip_address', 'fecha_acceso', 'acepto_terminos')
    # Filtros laterales para buscar rápido
    list_filter = ('fecha_acceso', 'acepto_terminos')
    # Buscador por IP
    search_fields = ('ip_address', 'user_agent')
    # Ordenar por lo más reciente primero
    ordering = ('-fecha_acceso',)