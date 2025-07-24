from rest_framework import viewsets
from core.models import Tecnologia
from core.serializers.tecnologia import TecnologiaSerializer

class TecnologiaViewSet(viewsets.ModelViewSet):
    queryset = Tecnologia.objects.all()
    serializer_class = TecnologiaSerializer
