from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, ProductImage,ProductColor,Category,Message,Address
from .serializers import ProductSerializer, ProductImageSerializer,ProductColorSerializer,CategorySerializer

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