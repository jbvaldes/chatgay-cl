"""
Django settings for core project.
Optimizado por Jorge para chatgay.cl - Stack: Docker + Postgres + Ubuntu 24
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Cargar variables de entorno del archivo .env
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-default-key-change-me')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', 'True') == 'True'

# Configurado para Docker y entorno local
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1,0.0.0.0').split(',')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # App de Auditoría Legal
    'seguridad',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # EL RADAR DE JORGE:
    'seguridad.middleware.AuditoriaPDIMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # CORRECCIÓN: Buscamos en la raíz y en la carpeta src si existe
        'DIRS': [
            BASE_DIR / 'templates',
            BASE_DIR / 'src' / 'templates',
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# Database - Configurada para PostgreSQL en Docker (Bodega SSD)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'chatgay_db'),
        'USER': os.getenv('DB_USER', 'jorge_admin'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'jorge_pass_segura_2026'),
        'HOST': os.getenv('DB_HOST', 'db'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# Internationalization - Configurado para Chile
LANGUAGE_CODE = 'es-cl'
TIME_ZONE = 'America/Santiago'
USE_I18N = True
USE_TZ = True

# --- CONFIGURACIÓN DE ARCHIVOS ESTÁTICOS ---
STATIC_URL = 'static/'
# CORRECCIÓN: Dónde se recolectan los archivos en producción (GCP)
STATIC_ROOT = BASE_DIR / 'staticfiles'
# CORRECCIÓN: Carpetas adicionales donde buscar archivos estáticos (CSS, JS)
STATICFILES_DIRS = [
    BASE_DIR / 'static',
    BASE_DIR / 'src' / 'static',
]

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --- CONFIGURACIÓN DE AUDITORÍA PDI ---
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': os.getenv('AUDIT_LOG_PATH', 'auditoria_pdi.log'),
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}

# --- INGENIERÍA DE SEGURIDAD (HARDENING) ---
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SECURE_REFERRER_POLICY = 'same-origin'

# Configuración de Cookies seguras (Activar solo con SSL/HTTPS)
if not DEBUG:
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True
