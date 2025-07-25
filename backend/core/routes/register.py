from django.urls import path
from core.views.register import RegisterViewSet  # Este es tu APIView

urlpatterns = [
    path('register/', RegisterViewSet.as_view(), name='api-register'),
]
