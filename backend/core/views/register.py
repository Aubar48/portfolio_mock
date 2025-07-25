from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny  # 👈 Importar permiso

class RegisterViewSet(APIView):
    permission_classes = [AllowAny]  # 👈 Permitir acceso sin autenticación

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username y password son requeridos."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "El usuario ya existe."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "Usuario creado correctamente."}, status=status.HTTP_201_CREATED)
