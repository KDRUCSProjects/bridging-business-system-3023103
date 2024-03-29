from rest_framework import routers
from .views import *
from django.urls import include, path
from knox import views as knox_views

router = routers.DefaultRouter()

router.register(r"product", PrdocutViewSet, basename="product")
router.register(r"product_image", ProductImageViewSet, basename="product_image")
router.register(r"order", OrderViewSet)
router.register(r"order_detial", OrderDetailViewSet)
router.register(r"business_profile", BusinessProfileViewSet)
router.register(r"product_color", ProductColorViewSet)
router.register(r"category", CategoryViewSet)
router.register(r"address", AddressViewSet)
router.register(r"message", MessageViewSet)
router.register(r"business_favorite_product", BusinessFavoriteProductViewSet)
router.register(r"ratting", RattingViewSet)
router.register(r"payment", PaymentViewSet)
router.register(r"contact_us", ContectUsViewSet)
router.register(r"users", UserViewSet)
router.register(r"advertisments", AdvertisementViewSet, basename="advertisments")


urlpatterns = [
    path("", include(router.urls)),
    path("verify/", userVerificationAPIView.as_view()),
    path("forget/password/email/", ForgetPasswordEmailView.as_view()),
    path("forget/password/otp/verify/", ForgetPasswordVerificationView.as_view()),
    path("change/password/", ChangePasswordView.as_view()),
    path("reset/password/", PasswordResetView.as_view()),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", knox_views.LogoutView.as_view(), name="logout"),
    path("logout/all/", knox_views.LogoutAllView.as_view(), name="logout_all"),
]
