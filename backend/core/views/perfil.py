from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.models import Perfil
from core.serializers import PerfilSerializer

class PerfilViewSet(viewsets.ModelViewSet):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna solo el perfil del usuario autenticado
        return Perfil.objects.filter()

    def perform_create(self, serializer):
        # Asigna automáticamente el usuario autenticado al crear un perfil
        serializer.save()
