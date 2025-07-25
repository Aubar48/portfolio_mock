from django.db import models
from django.contrib.auth.models import User

class Tecnologia(models.Model):
    nombre = models.CharField(max_length=50)
    icono = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    publicado = models.BooleanField(default=True)  # ← nuevo campo

    def __str__(self):
        return self.nombre
