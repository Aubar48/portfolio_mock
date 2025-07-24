from django.urls import path, include
from core.routes import urlpatterns as api_urls

urlpatterns = [
    path('', include(api_urls))
]
