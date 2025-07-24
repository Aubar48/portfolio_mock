from rest_framework.routers import DefaultRouter
from ..views.educaciones import EducacionViewSet

router = DefaultRouter()
router.register(r'educaciones', EducacionViewSet, basename='educacion')

urlpatterns = router.urls
