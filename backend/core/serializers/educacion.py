# core/serializers/educacion.py
from rest_framework import serializers
from core.models import Educacion

class EducacionSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Educacion
        fields = ['id', 'user', 'titulo', 'institucion', 'fecha', 'logo']
