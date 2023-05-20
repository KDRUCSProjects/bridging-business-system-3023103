from rest_framework import serializers
from .models import Product, ProductImage,ProductColor,Category,Address,Message


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"


class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fiels="__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model= Category
        fiels="__all__"






