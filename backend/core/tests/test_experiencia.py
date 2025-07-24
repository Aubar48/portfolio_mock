from django.test import TestCase
from django.contrib.auth.models import User
from core.models import Experiencia

class ExperienciaModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser')
        self.experiencia = Experiencia.objects.create(
            user=self.user,
            puesto='Desarrollador Junior',
            empresa='Empresa ABC',
            fecha='2018 - 2020',  # campo obligatorio agregado
            # logo puede omitirse porque es opcional
        )

    def test_crear_experiencia(self):
        self.assertEqual(self.experiencia.puesto, 'Desarrollador Junior')
        self.assertEqual(self.experiencia.user.username, 'testuser')
        self.assertEqual(self.experiencia.fecha, '2018 - 2020')

    def test_editar_experiencia(self):
        self.experiencia.puesto = 'Desarrollador Senior'
        self.experiencia.save()
        self.experiencia.refresh_from_db()
        self.assertEqual(self.experiencia.puesto, 'Desarrollador Senior')

    def test_eliminar_experiencia(self):
        experiencia_id = self.experiencia.id
        self.experiencia.delete()
        with self.assertRaises(Experiencia.DoesNotExist):
            Experiencia.objects.get(id=experiencia_id)

    def test_obtener_experiencia(self):
        experiencia = Experiencia.objects.get(id=self.experiencia.id)
        self.assertEqual(experiencia.empresa, 'Empresa ABC')
