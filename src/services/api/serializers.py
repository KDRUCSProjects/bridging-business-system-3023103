from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import validators
from .models import (
    Product,
    ProductImage,
    Order,
    OrderDetail,
    BusinessProfile,
    BusinessOwner,
    ProductColor,
    Category,
    Address,
    Message,
    BusinessFavoriteProduct,
    Ratting,
    ContactUs,
    Payment,
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


class BusinessProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessProfile
        fields = "__all__"


class BusinessOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessOwner
        fields = "__all__"


class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = "__all__"


class CategorySeralizer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


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
        fields = "__all__"


class RattingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratting
        fields = "__all__"


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"


class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "first_name", "last_name", "email", "password"]

        extra_kwargs = {
            "password": {"write_only": True, "required": True},
            "username": {
                "required": True,
                "allow_blank": False,
                "validators": [
                    validators.UniqueValidator(
                        get_user_model().objects.all(), "username already exists"
                    )
                ],
            },
            "email": {
                "required": True,
                "allow_blank": False,
                "validators": [
                    validators.UniqueValidator(
                        get_user_model().objects.all(),
                        "User with sach email already exists",
                    )
                ],
            },
        }

    def create(self, validated_data):
        username = validated_data.get("username")
        password = validated_data.get("passsword")
        first_name = validated_data.get("first_name")
        last_name = validated_data.get("last_name")
        email = validated_data.get("email")

        user = get_user_model().objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email,
        )
        return user
