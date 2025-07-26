from rest_framework import serializers
from core.models import Tecnologia

class TecnologiaSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)  # no se recibe del cliente

    class Meta:
        model = Tecnologia
        fields = ['id', 'nombre', 'icono', 'publicado', 'user']
