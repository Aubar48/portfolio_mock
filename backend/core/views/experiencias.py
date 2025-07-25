from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from core.models import Experiencia
from core.serializers import ExperienciaSerializer

class ExperienciaViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienciaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            # Devuelve solo las experiencias del usuario autenticado
            return Experiencia.objects.filter(user=self.request.user)
        # Para visitantes: solo las experiencias marcadas como publicadas
        return Experiencia.objects.filter(publicado=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
