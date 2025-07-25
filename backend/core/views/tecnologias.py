from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from core.models import Tecnologia
from core.serializers.tecnologia import TecnologiaSerializer

class TecnologiaViewSet(viewsets.ModelViewSet):
    serializer_class = TecnologiaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Tecnologia.objects.filter(user=user)
        return Tecnologia.objects.filter(publicado=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
