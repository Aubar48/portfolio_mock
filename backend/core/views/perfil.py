from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied
from core.models import Perfil
from core.serializers import PerfilSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

class PerfilViewSet(viewsets.ModelViewSet):
    serializer_class = PerfilSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    renderer_classes = [JSONRenderer]  # <-- forzar JSON
    parser_classes = [MultiPartParser, FormParser, JSONParser]  # ✅ Acepta JSON también

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            # Mostrar solo perfiles del usuario autenticado
            return Perfil.objects.filter(user=user)
        else:
            # Mostrar solo perfiles públicos para visitantes
            return Perfil.objects.filter(publicado=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


    def perform_update(self, serializer):
        if self.request.user != serializer.instance.user:
            raise PermissionDenied("No tenés permiso para editar este perfil.")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user != instance.user:
            raise PermissionDenied("No tenés permiso para eliminar este perfil.")
        instance.delete()
