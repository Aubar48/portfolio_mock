from .proyectos import urlpatterns as proyectos_urls
from .usuarios import urlpatterns as usuarios_urls
from .experiencias import urlpatterns as experiencias_urls
from .tecnologias import urlpatterns as tecnologias_urls
from .educaciones import urlpatterns as educaciones_urls
from .perfil import urlpatterns as perfil_urls
from .register import urlpatterns as register_urls
from .slide import urlpatterns as slide_urls
urlpatterns = (
    proyectos_urls +
    usuarios_urls +
    experiencias_urls +
    tecnologias_urls +
    educaciones_urls +
    perfil_urls +
    register_urls +
    slide_urls 
)
