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
    BusinessOwner,
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
)
from .serializers import (
    ProductSerializer,
    ProductImageSerializer,
    BusinessProfileSerializer,
    BusinessOwnerSerializer,
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
)
from django_filters.rest_framework import DjangoFilterBackend

# Permition:
# isAuthuticated
# isAdminUser
# IsAuthenticatedOrReadOnly:This permission is suitable if you want to your API to allow read permissions to anonymous users, and only allow write permissions to authenticated users.
# allowany

# Create your views here.


class PrdocutViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAdminUser]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]


class ProductImageViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer


class OrderViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderDetailViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
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
        print(product)
        product.quantity -= serializer.validated_data["quantity"]
        product.save()
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class BusinessProfileViewSet(viewsets.ModelViewSet):
    queryset = BusinessProfile.objects.all()
    serializer_class = BusinessProfileSerializer


class BusinessOwnerViewSet(viewsets.ModelViewSet):
    queryset = BusinessOwner.objects.all()
    serializer_class = BusinessOwnerSerializer


class ProductColorViewSet(viewsets.ModelViewSet):
    queryset = ProductColor.objects.all()
    serializer_class = ProductColorSerializer


class CategoryViewSet(viewsets.ModelViewSet):
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
        send_otp_via_email(user.email)
        return Response(
            {
                "description": "verify user using otp code, check your email for otp code",
                "user_info": {
                    "id": user.id,
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
                        "user doesn't exist with this email",
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
                        "verified user": {
                            "id": user.id,
                            "email": user.email,
                            "is_verified": user.is_verified,
                        },
                        "token": token,
                    },
                    status=status.HTTP_200_OK,
                )

        except:
            return Response("some thing went ronge")


class UserLoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return super(UserLoginView, self).post(request, format=None)
