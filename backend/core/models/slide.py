import os
from django.db import models
from django.contrib.auth.models import User

class Slide(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='slides')
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='carousel/')
    publicado = models.BooleanField(default=True, verbose_name="¿Publicado?")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.user.username})"

    def save(self, *args, **kwargs):
        try:
            slide_viejo = Slide.objects.get(pk=self.pk)
            if slide_viejo.image and slide_viejo.image != self.image:
                if os.path.isfile(slide_viejo.image.path):
                    os.remove(slide_viejo.image.path)
        except Slide.DoesNotExist:
            pass  # creación, no borrar nada
        super().save(*args, **kwargs)
