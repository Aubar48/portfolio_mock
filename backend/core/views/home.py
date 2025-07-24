from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from core.models import Proyecto, Experiencia, Educacion, Perfil, Tecnologia
from core.serializers import HomeSerializer


class HomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        perfil = Perfil.objects.filter(user=user).first()
        tecnologias = Tecnologia.objects.filter(user=user)
        educaciones = Educacion.objects.filter(user=user)
        proyectos = Proyecto.objects.filter(usuario=user)
        experiencias = Experiencia.objects.filter(user=user)

        data = {
            "perfil": perfil,
            "tecnologias": tecnologias,
            "educaciones": educaciones,
            "proyectos": proyectos,
            "experiencias": experiencias,
        }

        serializer = HomeSerializer(instance=data)
        return Response(serializer.data)
