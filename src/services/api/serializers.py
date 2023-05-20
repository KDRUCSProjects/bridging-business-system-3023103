from rest_framework import serializers
from .models import (
    Product,
    ProductImage,
    Order,
    OrderDetail,
    Business,
    BusinessOwner,
    ProductColor,
    Category,
    Address,
    Message,
    BusinessFavoriteProduct,
    Ratting,
)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = "__all__"


class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = "__all__"


class BusinessOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessOwner
        fields = "__all__"


class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fiels = "__all__"


class CategorySeralizer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fiels = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"


class BusinessFavoriteProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessFavoriteProduct
        fiels = "__all__"


class RattingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratting
        fiels = "__all__"
