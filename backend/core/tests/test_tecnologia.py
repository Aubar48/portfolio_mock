from django.test import TestCase
from django.contrib.auth.models import User
from core.models import Tecnologia

class TecnologiaModelTest(TestCase):

    def setUp(self):
        # Crear usuario para asignar a la tecnología
        self.user = User.objects.create_user(username='testuser')
        self.tech = Tecnologia.objects.create(
            nombre='Python',
            icono='python-icon',
            user=self.user  # obligatorio, sin esto falla
        )

    def test_crear_tecnologia(self):
        self.assertEqual(self.tech.nombre, 'Python')
        self.assertEqual(self.tech.user.username, 'testuser')

    def test_editar_tecnologia(self):
        self.tech.nombre = 'Django'
        self.tech.save()
        self.tech.refresh_from_db()
        self.assertEqual(self.tech.nombre, 'Django')

    def test_eliminar_tecnologia(self):
        tech_id = self.tech.id
        self.tech.delete()
        with self.assertRaises(Tecnologia.DoesNotExist):
            Tecnologia.objects.get(id=tech_id)

    def test_obtener_tecnologia(self):
        tech = Tecnologia.objects.get(id=self.tech.id)
        self.assertEqual(tech.nombre, 'Python')
