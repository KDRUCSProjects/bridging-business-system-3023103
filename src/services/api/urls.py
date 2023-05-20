from rest_framework import routers
from .views import *
from django.urls import include, path

router = routers.DefaultRouter()

router.register(r"product", PrdocutViewSet)
router.register(r"product_image", ProductImageViewSet)
router.register(r"product_color",ProductColorViewSet)
router.register(r"category",CategoryViewSet)

urlpatterns = [path("", include(router.urls))]
