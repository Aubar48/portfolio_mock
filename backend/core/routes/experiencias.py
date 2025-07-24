from rest_framework.routers import DefaultRouter
from ..views.experiencias import ExperienciaViewSet

router = DefaultRouter()
router.register(r'experiencias', ExperienciaViewSet, basename='experiencia')

urlpatterns = router.urls
