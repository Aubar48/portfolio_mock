from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from core.models import Slide
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

class SlideModelViewSetTest(APITestCase):

    def setUp(self):
        # Crear usuario y token para autenticación
        self.user = User.objects.create_user(username='testuser', password='12345')
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

        # URL del endpoint listado de slides
        self.list_url = reverse('slide-list')

        # Datos válidos para crear slide
        self.slide_data = {
            'title': 'Test Slide',
            'publicado': True,
            # incluir otros campos obligatorios si los hay
        }

        # Crear un slide inicial para algunos tests
        self.slide = Slide.objects.create(user=self.user, title='Slide1', publicado=True)

    def test_listar_slides_publicos(self):
        response = self.client.get(self.list_url)  # Sin autenticación
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_crear_slide_sin_autenticacion(self):
        response = self.client.post(self.list_url, self.slide_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_crear_slide_con_autenticacion(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        response = self.client.post(self.list_url, self.slide_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        slide_creado = Slide.objects.get(id=response.data['id'])
        self.assertEqual(slide_creado.user, self.user)
        self.assertEqual(slide_creado.title, self.slide_data['title'])
        self.assertEqual(slide_creado.publicado, self.slide_data['publicado'])

    def test_editar_slide(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        url_detail = reverse('slide-detail', kwargs={'pk': self.slide.id})
        nuevos_datos = {'title': 'Slide Modificado', 'publicado': False}
        response = self.client.put(url_detail, nuevos_datos)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.slide.refresh_from_db()
        self.assertEqual(self.slide.title, 'Slide Modificado')
        self.assertFalse(self.slide.publicado)

    def test_eliminar_slide(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        url_detail = reverse('slide-detail', kwargs={'pk': self.slide.id})
        response = self.client.delete(url_detail)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(Slide.DoesNotExist):
            Slide.objects.get(id=self.slide.id)

    def test_obtener_slide(self):
        url_detail = reverse('slide-detail', kwargs={'pk': self.slide.id})
        response = self.client.get(url_detail)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.slide.title)
        self.assertEqual(response.data['publicado'], self.slide.publicado)
