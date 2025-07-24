# core/views/educacion.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.models import Educacion
from core.serializers import EducacionSerializer

class EducacionViewSet(viewsets.ModelViewSet):
    serializer_class = EducacionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Educacion.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
