from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.models import Experiencia
from core.serializers import ExperienciaSerializer

class ExperienciaViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienciaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Solo mostrar experiencias del usuario autenticado
        return Experiencia.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Asigna el usuario autenticado al crear una experiencia
        serializer.save(user=self.request.user)
