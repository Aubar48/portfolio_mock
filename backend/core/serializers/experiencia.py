from rest_framework import serializers
from core.models import Experiencia

class ExperienciaSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  # muestra el username del usuario

    class Meta:
        model = Experiencia
        fields = ['id', 'user', 'puesto', 'empresa', 'fecha', 'logo']
