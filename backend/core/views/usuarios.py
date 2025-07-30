from rest_framework import viewsets
from django.contrib.auth.models import User
from core.serializers import UsuarioSerializer

from rest_framework.permissions import IsAuthenticated

class UsuarioViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UsuarioSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return User.objects.all()
        return User.objects.filter(id=user.id)
