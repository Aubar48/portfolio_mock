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

    def __str__(self):
        return f"{self.nombre} ({self.user.username})"
