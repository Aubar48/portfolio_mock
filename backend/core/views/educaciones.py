from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from core.models import Educacion
from core.serializers import EducacionSerializer

class EducacionViewSet(viewsets.ModelViewSet):
    serializer_class = EducacionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            # El usuario ve todas sus educaciones, sin importar publicado
            return Educacion.objects.filter(user=user)
        # Los no autenticados solo ven educaciones publicadas
        return Educacion.objects.filter(publicado=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
