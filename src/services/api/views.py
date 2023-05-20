from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, ProductImage,ProductColor,Category,Message,Address
from .serializers import ProductSerializer, ProductImageSerializer,ProductColorSerializer,CategorySerializer,AddressSerializer,MessageSerializer

# Create your views here.


class PrdocutViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer



class ProductColorViewSet(viewsets.ModelViewSet):
    queryset=ProductColor.objects.all()
    serializer_class = ProductColorSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer