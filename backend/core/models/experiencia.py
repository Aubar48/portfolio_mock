from django.db import models
from django.contrib.auth.models import User

class Experiencia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='experiencias')  # vínculo al usuario
    puesto = models.CharField(max_length=100)
    empresa = models.CharField(max_length=100)
    fecha = models.CharField(max_length=50)
    logo = models.ImageField(upload_to='experiencia/', blank=True, null=True)
    publicado = models.BooleanField(default=True)  # Nuevo campo

    def __str__(self):
        return f"{self.puesto} - {self.empresa}"
