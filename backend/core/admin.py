from django.contrib import admin
from core.models import Perfil, Experiencia, Educacion, Proyecto, Tecnologia

@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    list_display = ('user', 'titulo')  # Quité 'ubicacion'
    search_fields = ('user__username', 'titulo')

@admin.register(Experiencia)
class ExperienciaAdmin(admin.ModelAdmin):
    list_display = ('user', 'puesto', 'empresa')  # Quité 'inicio', 'fin'
    list_filter = ('empresa',)
    search_fields = ('puesto', 'empresa', 'descripcion')

@admin.register(Educacion)
class EducacionAdmin(admin.ModelAdmin):
    list_display = ('user', 'institucion', 'titulo')  # Quité 'inicio', 'fin'
    search_fields = ('institucion', 'titulo')

@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'usuario', 'codigo_url', 'demo_url')
    search_fields = ('titulo', 'descripcion')
    list_filter = ('usuario',)

@admin.register(Tecnologia)
class TecnologiaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'icono')
    search_fields = ('nombre',)
