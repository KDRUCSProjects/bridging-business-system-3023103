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


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = "__all__"


class RattingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratting
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    product_ratting = RattingSerializer(many=True, read_only=True)
    ratting = serializers.SerializerMethodField(
        method_name="calculated_ratting", read_only=True
    )
    images = ProductImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(
            max_length=1000000, allow_empty_file=False, use_url=False
        ),
        write_only=True,
    )

    class Meta:
        model = Product
        fields = "__all__"

    def create(self, validated_data):
        prodcut_image_data = validated_data.pop("uploaded_images")
        product = Product.objects.create(**validated_data)
        for product_image in prodcut_image_data:
            ProductImage.objects.create(product=product, image=product_image)
        return product

    # for ratting calculations
    def calculated_ratting(self, instance):
        rattings = Ratting.objects.filter(product=instance.id)
        total_stars = 0
        total_user = 0
        try:
            for ratting in rattings:
                total_stars = total_stars + ratting.ratting_stars
                total_user += 1

            return total_stars / total_user
        except:
            return 0


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailSerializer(many=True, read_only=True)
    uploaded_order_products = serializers.ListField(write_only=True)
    address = AddressSerializer()

    class Meta:
        model = Order
        fields = "__all__"

    def create(self, validated_data):
        ordered_products = validated_data.pop("uploaded_order_products")
        address = validated_data.pop("address")
        address = Address.objects.create(**address)
        order = Order.objects.create(address=address, **validated_data)
        for ordered_product in ordered_products:
            product = Product.objects.get(pk=ordered_product["product"])
            OrderDetail.objects.create(
                order=order,
                product=product,
                quantity=ordered_product["quantity"],
                price=ordered_product["price"],
            )
        return order


class BusinessOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessOwner
        fields = "__all__"


class BusinessProfileSerializer(serializers.ModelSerializer):
    business_owner = BusinessOwnerSerializer()
    address = AddressSerializer()

    class Meta:
        model = BusinessProfile
        fields = "__all__"

    def create(self, validated_data):
        business_owner = validated_data.pop("business_owner")
        address = validated_data.pop("address")
        business_owner_obj = BusinessOwner.objects.create(**business_owner)
        address_obj = Address.objects.create(**address)
        business_profile = BusinessProfile.objects.create(
            business_owner=business_owner_obj, address=address_obj, **validated_data
        )
        return business_profile


class CategorySeralizer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
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
        password = validated_data.get("password")
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


class UserVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()


class BusinessFavoriteProductSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = BusinessFavoriteProduct
        fields = "__all__"


class BusinessFavoriteProductPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessFavoriteProduct
        fields = "__all__"


class ContactUsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = ContactUs
        fields = "__all__"


class ContactUsPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    recever = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = "__all__"


class MessagePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
