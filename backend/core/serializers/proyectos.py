from rest_framework import serializers
from core.models import Proyecto, Tecnologia

class TecnologiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tecnologia
        fields = '__all__'

class ProyectoSerializer(serializers.ModelSerializer):
    tecnologias = TecnologiaSerializer(many=True, read_only=True)
    tecnologias_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Tecnologia.objects.all(), write_only=True, source='tecnologias'
    )
    usuario = serializers.ReadOnlyField(source='usuario.username')

    class Meta:
        model = Proyecto
        fields = ['id', 'usuario', 'titulo', 'descripcion', 'imagen', 'demo_url', 'codigo_url', 'tecnologias', 'tecnologias_ids']

    def create(self, validated_data):
        tecnologias = validated_data.pop('tecnologias', [])
        proyecto = Proyecto.objects.create(**validated_data)
        proyecto.tecnologias.set(tecnologias)
        return proyecto

    def update(self, instance, validated_data):
        tecnologias = validated_data.pop('tecnologias', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if tecnologias is not None:
            instance.tecnologias.set(tecnologias)
        instance.save()
        return instance
