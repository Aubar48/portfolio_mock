from rest_framework import serializers
from core.models import Proyecto, Experiencia, Educacion, Perfil, Tecnologia

class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = '__all__'

class TecnologiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tecnologia
        fields = '__all__'

class EducacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Educacion
        fields = '__all__'

class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = '__all__'

class ExperienciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiencia
        fields = '__all__'

class HomeSerializer(serializers.Serializer):
    perfil = PerfilSerializer(allow_null=True)
    tecnologias = TecnologiaSerializer(many=True)
    educaciones = EducacionSerializer(many=True)
    proyectos = ProyectoSerializer(many=True)
    experiencias = ExperienciaSerializer(many=True)
