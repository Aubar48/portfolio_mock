from rest_framework import serializers
from core.models import Perfil

class PerfilSerializer(serializers.ModelSerializer):
    usuario = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Perfil
        fields = ['id', 'usuario', 'nombre', 'titulo', 'descripcion', 'sobre_mi', 'imagen', 'linkedin', 'github']
        read_only_fields = ['id']  # id no editable

    def create(self, validated_data):
        user = self.context['request'].user
        return Perfil.objects.create(user=user, **validated_data)
