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
