import os
from django.db import models
from django.contrib.auth.models import User

class Experiencia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='experiencias')
    puesto = models.CharField(max_length=100)
    empresa = models.CharField(max_length=100)
    fecha = models.CharField(max_length=50)
    logo = models.ImageField(upload_to='experiencia/', blank=True, null=True)
    publicado = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.puesto} - {self.empresa}"

    def save(self, *args, **kwargs):
        try:
            experiencia_vieja = Experiencia.objects.get(pk=self.pk)
            if experiencia_vieja.logo and experiencia_vieja.logo != self.logo:
                if os.path.isfile(experiencia_vieja.logo.path):
                    os.remove(experiencia_vieja.logo.path)
        except Experiencia.DoesNotExist:
            pass  # creación, no hay archivo previo
        super().save(*args, **kwargs)
