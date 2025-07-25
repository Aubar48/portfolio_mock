# routes/perfil.py
from rest_framework import routers
from ..views import PerfilViewSet  # Ajusta la ruta según tu estructura

router = routers.DefaultRouter()
router.register(r'perfil', PerfilViewSet, basename='perfil')

urlpatterns = router.urls
