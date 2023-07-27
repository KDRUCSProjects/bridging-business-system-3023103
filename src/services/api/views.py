from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from knox.models import AuthToken
from django.contrib.auth import login, get_user_model
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import viewsets, status
from .email import send_otp_via_email
from .models import (
    Product,
    ProductImage,
    BusinessProfile,
    OrderDetail,
    Order,
    ProductColor,
    Category,
    Address,
    Message,
    BusinessFavoriteProduct,
    Ratting,
    ContactUs,
    Payment,
    User,
    Advertisement,
)
from .serializers import (
    ProductSerializer,
    ProductImageSerializer,
    BusinessProfileSerializer,
    OrderSerializer,
    OrderDetailSerializer,
    ProductColorSerializer,
    CategorySeralizer,
    AddressSerializer,
    MessageSerializer,
    BusinessFavoriteProductSerializer,
    RattingSerializer,
    PaymentSerializer,
    ContactUsSerializer,
    UserSerializer,
    BusinessFavoriteProductPostSerializer,
    ContactUsPostSerializer,
    MessagePostSerializer,
    UserVerificationSerializer,
    ForgetPasswordEmailSerializer,
    ForgetPasswordVerificationSerializer,
    ChangePasswordSerializer,
    PasswordResetSerializer,
    AdvertisementSerializer,
)
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .access_policies.category import CategoryAccessPolicy
from .access_policies.order import OrderAccessPolicy
from .access_policies.Product import ProductAccessPolicy
from .pagination import ProductPagination, BusinessPagination
from .filters import ProductFilter

# Permition:
# isAuthuticated
# isAdminUser
# IsAuthenticatedOrReadOnly:This permission is suitable if you want to your API to allow read permissions to anonymous users, and only allow write permissions to authenticated users.
# allowany

# Create your views here.


class PrdocutViewSet(viewsets.ModelViewSet):
    permission_classes = [ProductAccessPolicy]
    queryset = Product.objects.order_by("-created_at")
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = ProductFilter
    search_fields = ["name"]
    pagination_class = ProductPagination
    ordering = ["id"]


class ProductImageViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer


class OrderViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderDetailViewSet(viewsets.ModelViewSet):
    permission_classes = [OrderAccessPolicy]
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.validated_data["product"]
        if product.quantity < serializer.validated_data["quantity"]:
            return Response(
                "Stock quantity: "
                + str(product.quantity)
                + " Entry quantity: "
                + str(serializer.validated_data["quantity"]),
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )
        product.quantity -= serializer.validated_data["quantity"]
        if product.quantity == 0:
            product.is_sold = True
        product.save()
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class BusinessProfileViewSet(viewsets.ModelViewSet):
    queryset = BusinessProfile.objects.all()
    serializer_class = BusinessProfileSerializer
    pagination_class = BusinessPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ["businessName"]
    filterset_fields = ["user"]


class ProductColorViewSet(viewsets.ModelViewSet):
    queryset = ProductColor.objects.all()
    serializer_class = ProductColorSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = (CategoryAccessPolicy,)
    queryset = Category.objects.all()
    serializer_class = CategorySeralizer


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_serializer_class(self):
        if self.action == "create" or self.action == "update":
            return MessagePostSerializer
        else:
            return MessageSerializer


class BusinessFavoriteProductViewSet(viewsets.ModelViewSet):
    queryset = BusinessFavoriteProduct.objects.all()
    serializer_class = BusinessFavoriteProductSerializer

    def get_serializer_class(self):
        if self.action == "create" or self.action == "update":
            return BusinessFavoriteProductPostSerializer
        else:
            return BusinessFavoriteProductSerializer


class RattingViewSet(viewsets.ModelViewSet):
    queryset = Ratting.objects.all()
    serializer_class = RattingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["product"]


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class ContectUsViewSet(viewsets.ModelViewSet):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer

    def get_serializer_class(self):
        if self.action == "create" or self.action == "update":
            return ContactUsPostSerializer
        else:
            return ContactUsSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def create(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        send_otp_via_email(user.email, "Your account verification email")
        return Response(
            {
                "description": "Check email for otp code",
                "user_info": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "is_verified": user.is_verified,
                },
            },
        )


class userVerificationAPIView(APIView):
    def post(self, request):
        try:
            data = request.data
            serializer = UserVerificationSerializer(data=data)
            if serializer.is_valid():
                email = serializer.data["email"]
                otp = serializer.data["otp"]
                user = User.objects.filter(email=email)
                if not user.exists():
                    return Response(
                        "user doesn't exist",
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                if user[0].otp != otp:
                    return Response(
                        "invalid otp code", status=status.HTTP_400_BAD_REQUEST
                    )

                user = get_user_model().objects.get(id=user[0].id)
                user.is_verified = True
                user.otp = ""
                user.save()
                token = AuthToken.objects.create(user)[1]
                return Response(
                    {
                        "verified_user": {
                            "id": user.id,
                            "username": user.username,
                            "email": user.email,
                            "is_verified": user.is_verified,
                        },
                        "token": token,
                    },
                    status=status.HTTP_200_OK,
                )

        except:
            return Response("some thing went wronge")


class ForgetPasswordEmailView(APIView):
    def post(self, request):
        serializer = ForgetPasswordEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response("Check email for otp", status=status.HTTP_200_OK)


class ForgetPasswordVerificationView(APIView):
    def post(self, request):
        serializer = ForgetPasswordVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response("otp code verified", status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response("Password is changed", status=status.HTTP_200_OK)


class PasswordResetView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response("password is reseted", status=status.HTTP_200_OK)


class UserLoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        print(user.is_verified)
        if user.is_verified == False:
            return Response(
                {"detail": "Not activated user."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        login(request, user)
        return super(UserLoginView, self).post(request, format=None)


class AdvertisementViewSet(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer
