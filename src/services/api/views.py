from django.shortcuts import render
from rest_framework import viewsets
from .models import (
    Product,
    ProductImage,
    Business,
    BusinessOwner,
    OrderDetail,
    Order,
    ProductColor,
    Category,
    Address,
    Message,
    BusinessFavoriteProduct,
    Ratting,
)
from .serializers import (
    ProductSerializer,
    ProductImageSerializer,
    BusinessSerializer,
    BusinessOwnerSerializer,
    OrderSerializer,
    OrderDetailSerializer,
    ProductColorSerializer,
    CategorySeralizer,
    AddressSerializer,
    MessageSerializer,
    BusinessFavoriteProductSerializer,
    RattingSerializer,
)


# Create your views here.


class PrdocutViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderDetailViewSet(viewsets.ModelViewSet):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer


class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer


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


class BusinessFavoriteProductViewSet(viewsets.ModelViewSet):
    queryset = BusinessFavoriteProduct.objects.all()
    serializer_class = BusinessFavoriteProductSerializer


class RattingViewSet(viewsets.ModelViewSet):
    queryset = Ratting.objects.all()
    serializer_class = RattingSerializer
