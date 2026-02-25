"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.shortcuts import render
from django.http import HttpResponse # Importado para SEO directo

# --- VISTAS DEL PROYECTO CHATGAY.CL ---

def home(request):
    """Vista principal de auditoría y entrada"""
    return render(request, 'index.html')

def terminos(request):
    """Vista de advertencia legal y responsabilidad penal"""
    return render(request, 'terminos.html')

def publicidad(request):
    """Vista para gestión de anuncios y micropagos"""
    return render(request, 'publicidad.html')

# --- BLOQUE SEO (Robots y Sitemap) ---

def robots_txt(request):
    content = "User-agent: *\nAllow: /\nDisallow: /bodega-secreta-jorge-2026/\nSitemap: https://chatgay.cl/sitemap.xml"
    return HttpResponse(content, content_type="text/plain")

def sitemap_xml(request):
    content = """<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://chatgay.cl/</loc><priority>1.0</priority></url>
        <url><loc>https://chatgay.cl/terminos</loc><priority>0.8</priority></url>
    </urlset>"""
    return HttpResponse(content, content_type="application/xml")

# --- CONFIGURACIÓN DE RUTAS ---

urlpatterns = [
    # INGENIERÍA: Ruta administrativa protegida (Bodega Secreta)
    path('bodega-secreta-jorge-2026/', admin.site.urls),
    
    # FRONTEND
    path('', home, name='home'),
    path('terminos/', terminos, name='terminos'),
    path('contacto-publicidad/', publicidad, name='publicidad'),
    
    # SEO ASSETTS
    path('robots.txt', robots_txt),
    path('sitemap.xml', sitemap_xml),
]