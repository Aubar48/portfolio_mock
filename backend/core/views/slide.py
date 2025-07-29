from rest_framework import viewsets, permissions
from core.models import Slide
from core.serializers import SlideSerializer
from rest_framework import viewsets, permissions

class SlideViewSet(viewsets.ModelViewSet):
    serializer_class = SlideSerializer

    def get_permissions(self):
        # Para listar y obtener un slide, no requiere estar autenticado (permiso AllowAny)
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            # Para crear, actualizar o borrar, se requiere estar autenticado
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        # Si es una consulta pública (list o retrieve), devolvemos todos los slides
        if self.action in ['list', 'retrieve']:
            return Slide.objects.all()
        # Para acciones que modifican, filtramos por usuario para seguridad
        return Slide.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Al crear, se asocia el slide al usuario logueado
        serializer.save(user=self.request.user)
