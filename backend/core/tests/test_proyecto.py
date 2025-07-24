from django.test import TestCase
from django.contrib.auth.models import User
from core.models import Proyecto, Tecnologia

class ProyectoModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser')
        self.tech = Tecnologia.objects.create(
            nombre='Django',
            icono='django-icon',
            user=self.user  # <-- clave para evitar el error NOT NULL
        )
        self.proyecto = Proyecto.objects.create(
            titulo='Mi Proyecto',
            descripcion='Descripción de prueba',
            usuario=self.user,
            codigo_url='https://github.com/testuser/proyecto',
            demo_url='https://demo.proyecto.com'
        )
        self.proyecto.tecnologias.add(self.tech)

    def test_crear_proyecto(self):
        self.assertEqual(self.proyecto.titulo, 'Mi Proyecto')
        self.assertEqual(self.proyecto.usuario.username, 'testuser')
        self.assertIn(self.tech, self.proyecto.tecnologias.all())

    def test_editar_proyecto(self):
        self.proyecto.titulo = 'Proyecto Editado'
        self.proyecto.save()
        self.proyecto.refresh_from_db()
        self.assertEqual(self.proyecto.titulo, 'Proyecto Editado')

    def test_eliminar_proyecto(self):
        proyecto_id = self.proyecto.id
        self.proyecto.delete()
        with self.assertRaises(Proyecto.DoesNotExist):
            Proyecto.objects.get(id=proyecto_id)

    def test_obtener_proyecto(self):
        proyecto = Proyecto.objects.get(id=self.proyecto.id)
        self.assertEqual(proyecto.descripcion, 'Descripción de prueba')
