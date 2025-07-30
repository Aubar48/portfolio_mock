import os
from django.db import models
from django.contrib.auth.models import User

class Educacion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='educaciones')
    titulo = models.CharField(max_length=100)
    institucion = models.CharField(max_length=100)
    fecha = models.CharField(max_length=50)
    logo = models.ImageField(upload_to='educacion/', blank=True, null=True)
    publicado = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.titulo} - {self.institucion}"

    def save(self, *args, **kwargs):
        try:
            educacion_vieja = Educacion.objects.get(pk=self.pk)
            if educacion_vieja.logo and educacion_vieja.logo != self.logo:
                if os.path.isfile(educacion_vieja.logo.path):
                    os.remove(educacion_vieja.logo.path)
        except Educacion.DoesNotExist:
            pass  # Es creación, no borrar nada
        super().save(*args, **kwargs)
