from rest_framework import routers
from core.views import SlideViewSet

router = routers.DefaultRouter()
router.register(r'slides', SlideViewSet, basename='slide')

urlpatterns = router.urls
