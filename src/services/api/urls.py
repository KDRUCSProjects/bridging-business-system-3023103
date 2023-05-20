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
router.register(r"product_color", ProductColorViewSet)
router.register(r"category", CategoryViewSet)
router.register(r"address", AddressViewSet)
router.register(r"message", MessageViewSet)
router.register(r"business_favorite_product", BusinessFavoriteProductViewSet)
router.register(r"ratting", RattingViewSet)
router.register(r"payment", PaymentViewSet)
router.register(r"contact_us", ContectUsViewSet)

urlpatterns = [path("", include(router.urls))]
