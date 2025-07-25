from django.db import models
from django.contrib.auth.models import User

class Educacion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='educaciones')  # relación con usuario
    titulo = models.CharField(max_length=100)
    institucion = models.CharField(max_length=100)
    fecha = models.CharField(max_length=50)
    logo = models.ImageField(upload_to='educacion/', blank=True, null=True)
    publicado = models.BooleanField(default=True)  # 👈 nuevo campo agregado

    def __str__(self):
        return f"{self.titulo} - {self.institucion}"
