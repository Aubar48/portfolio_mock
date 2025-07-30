import os
from django.db import models
from .tecnologia import Tecnologia
from django.contrib.auth.models import User

class Proyecto(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='proyectos')
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='proyectos/', blank=True, null=True)
    demo_url = models.URLField(blank=True, null=True)
    codigo_url = models.URLField(blank=True, null=True)
    tecnologias = models.ManyToManyField(Tecnologia, blank=True)
    publicado = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.usuario.username} - {self.titulo}"

    def save(self, *args, **kwargs):
        try:
            proyecto_viejo = Proyecto.objects.get(pk=self.pk)
            if proyecto_viejo.imagen and proyecto_viejo.imagen != self.imagen:
                if os.path.isfile(proyecto_viejo.imagen.path):
                    os.remove(proyecto_viejo.imagen.path)
        except Proyecto.DoesNotExist:
            pass  # creación, no borrar nada
        super().save(*args, **kwargs)
