 from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
import os

# Create your views here.

def index(request):
    """Vista principal del búnker"""
    return render(request, 'index.html')

def terminos(request):
    """Vista de términos legales y advertencia PDI"""
    return render(request, 'terminos.html')

def foros(request):
    """Vista de los foros regionales"""
    return render(request, 'foros.html')

def contacto_publicidad(request):
    """Vista para gestión de anuncios"""
    return render(request, 'publicidad.html')

# --- BLOQUE SEO PARA PRODUCCIÓN ---

def robots_txt(request):
    """Sirve el archivo robots.txt desde la raíz"""
    lines = [
        "User-agent: *",
        "Allow: /",
        "Allow: /foros",
        "Disallow: /admin/",
        "Disallow: /config/",
        f"Sitemap: {request.build_absolute_uri('/sitemap.xml')}"
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")

def sitemap_xml(request):
    """Genera el Sitemap XML dinámicamente o sirve uno estático"""
    # Aquí puedes luego automatizarlo con tus categorías de regiones de Chile
    sitemap_content = """<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://chatgay.cl/</loc><priority>1.0</priority></url>
      <url><loc>https://chatgay.cl/foros</loc><priority>0.8</priority></url>
      <url><loc>https://chatgay.cl/terminos</loc><priority>0.3</priority></url>
    </urlset>"""
    return HttpResponse(sitemap_content, content_type="application/xml")