from rest_framework import routers
from .views import *
from django.urls import include, path

router = routers.DefaultRouter()

router.register(r"product", PrdocutViewSet)
router.register(r"product_image", ProductImageViewSet)
router.register(r"order", OrderViewSet)
router.register(r"order_detial", OrderDetailViewSet)
router.register(r"business", BusinessViewSet)
router.register(r"business_owner", BusinessOwnerViewSet)


urlpatterns = [path("", include(router.urls))]