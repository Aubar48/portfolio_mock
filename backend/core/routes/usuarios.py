from rest_framework.routers import DefaultRouter
from ..views.usuarios import UsuarioViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = router.urls
