from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, ProductImage
from .serializers import ProductSerializer, ProductImageSerializer

# Create your views here.


class PrdocutViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
