from django.test import TestCase
from django.contrib.auth.models import User
from core.models import Perfil

class PerfilModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser')
        self.perfil = Perfil.objects.create(
            user=self.user,
            nombre='Juan Pérez',
            titulo='Desarrollador',
            descripcion='Apasionado por la tecnología',
            # los demás campos son opcionales
        )

    def test_crear_perfil(self):
        self.assertEqual(self.perfil.titulo, 'Desarrollador')
        self.assertEqual(self.perfil.user.username, 'testuser')
        self.assertEqual(self.perfil.nombre, 'Juan Pérez')
        self.assertEqual(self.perfil.descripcion, 'Apasionado por la tecnología')

    def test_editar_perfil(self):
        self.perfil.titulo = 'Desarrollador Senior'
        self.perfil.save()
        self.perfil.refresh_from_db()
        self.assertEqual(self.perfil.titulo, 'Desarrollador Senior')

    def test_eliminar_perfil(self):
        perfil_id = self.perfil.id
        self.perfil.delete()
        with self.assertRaises(Perfil.DoesNotExist):
            Perfil.objects.get(id=perfil_id)

    def test_obtener_perfil(self):
        perfil = Perfil.objects.get(id=self.perfil.id)
        self.assertEqual(perfil.titulo, 'Desarrollador')
