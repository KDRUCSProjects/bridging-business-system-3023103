from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from knox.models import AuthToken
from django.contrib.auth import login, get_user_model
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import viewsets, status
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
)

# Permition:
# isAuthuticated
# isAdminUser
# IsAuthenticatedOrReadOnly:This permission is suitable if you want to your API to allow read permissions to anonymous users, and only allow write permissions to authenticated users.
# allowany

# Create your views here.


class PrdocutViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductImageViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer


class PrdocutViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


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
        if self.action == "create":
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
        token = AuthToken.objects.create(user)[1]
        return Response(
            {
                "user_info": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
                "token": token,
            }
        )


class UserLoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return super(UserLoginView, self).post(request, format=None)
