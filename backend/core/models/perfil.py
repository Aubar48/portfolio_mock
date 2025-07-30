import os
from django.db import models
from django.contrib.auth.models import User

class Perfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # relación con el usuario
    nombre = models.CharField(max_length=100)
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    sobre_mi = models.TextField(blank=True, null=True)
    imagen = models.ImageField(upload_to='perfil/', blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    publicado = models.BooleanField(default=True)  # ← Campo nuevo

    def __str__(self):
        return f"{self.nombre} ({self.user.username})"

    def save(self, *args, **kwargs):
        try:
            # Intentamos obtener el perfil existente para comparar la imagen
            perfil_viejo = Perfil.objects.get(pk=self.pk)
            if perfil_viejo.imagen and perfil_viejo.imagen != self.imagen:
                # Si la imagen anterior existe y es diferente a la nueva, borramos el archivo anterior
                if os.path.isfile(perfil_viejo.imagen.path):
                    os.remove(perfil_viejo.imagen.path)
        except Perfil.DoesNotExist:
            # Si no existe perfil previo, es creación, no hay que borrar nada
            pass
        super().save(*args, **kwargs)
