from django.test import TestCase
from django.contrib.auth.models import User
from core.models import Educacion

class EducacionModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser')
        self.educacion = Educacion.objects.create(
            user=self.user,
            institucion='Universidad XYZ',
            titulo='Ingeniería en Sistemas',
            fecha='2010 - 2015',  # Agregado campo requerido
            # logo puede omitirse porque es opcional
        )

    def test_crear_educacion(self):
        self.assertEqual(self.educacion.institucion, 'Universidad XYZ')
        self.assertEqual(self.educacion.user.username, 'testuser')
        self.assertEqual(self.educacion.fecha, '2010 - 2015')

    def test_editar_educacion(self):
        self.educacion.titulo = 'Licenciatura en Sistemas'
        self.educacion.save()
        self.educacion.refresh_from_db()
        self.assertEqual(self.educacion.titulo, 'Licenciatura en Sistemas')

    def test_eliminar_educacion(self):
        educacion_id = self.educacion.id
        self.educacion.delete()
        with self.assertRaises(Educacion.DoesNotExist):
            Educacion.objects.get(id=educacion_id)

    def test_obtener_educacion(self):
        educacion = Educacion.objects.get(id=self.educacion.id)
        self.assertEqual(educacion.institucion, 'Universidad XYZ')
