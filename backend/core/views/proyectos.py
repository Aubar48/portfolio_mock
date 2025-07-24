from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import Proyecto
from ..serializers import ProyectoSerializer

class ProyectoViewSet(viewsets.ModelViewSet):
    serializer_class = ProyectoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna solo los proyectos del usuario autenticado
        return Proyecto.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        # Al crear, asigna automáticamente el usuario autenticado
        serializer.save(usuario=self.request.user)
