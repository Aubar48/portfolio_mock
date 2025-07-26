from rest_framework import viewsets 
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models import Proyecto
from ..serializers import ProyectoSerializer
from rest_framework.renderers import JSONRenderer

class ProyectoViewSet(viewsets.ModelViewSet):
    serializer_class = ProyectoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    renderer_classes = [JSONRenderer]  # <-- forzar JSON

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            # Si está autenticado, muestra solo sus propios proyectos
            return Proyecto.objects.filter(usuario=user)
        else:
            # Si no está autenticado, muestra solo los proyectos públicos
            return Proyecto.objects.filter(publicado=True)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
