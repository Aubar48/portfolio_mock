from rest_framework.routers import DefaultRouter
from core.views.tecnologias import TecnologiaViewSet

router = DefaultRouter()
router.register(r'tecnologias', TecnologiaViewSet, basename='tecnologia')

urlpatterns = router.urls
