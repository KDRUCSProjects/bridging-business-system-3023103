from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework import validators
from .models import (
    Product,
    ProductImage,
    Order,
    OrderDetail,
    BusinessProfile,
    ProductColor,
    Category,
    Address,
    Message,
    BusinessFavoriteProduct,
    Ratting,
    ContactUs,
    Payment,
    Advertisement,
)
from .email import send_otp_via_email


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
    productRatting = RattingSerializer(many=True, read_only=True)
    ratting = serializers.SerializerMethodField(
        method_name="calculated_ratting", read_only=True
    )
    available_quantity = serializers.SerializerMethodField(
        method_name="available_product", read_only=True
    )
    images = ProductImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(
            max_length=1000000, allow_empty_file=False, use_url=False
        ),
        write_only=True,
    )
    counter = serializers.SerializerMethodField(
        read_only=True, method_name="counter_method"
    )

    class Meta:
        model = Product
        fields = "__all__"

    def counter_method(self, instance):
        return 1

    def create(self, validated_data):
        color = validated_data.pop("color")
        prodcut_image_data = validated_data.pop("uploaded_images")
        product = Product.objects.create(**validated_data)
        product.color.set(color)
        for product_image in prodcut_image_data:
            ProductImage.objects.create(product=product, image=product_image)
        return product

    def available_product(self, instance):
        return instance.quantity

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        product_colors = []
        for color in representation["color"]:
            color_obj = ProductColor.objects.get(id=color)
            object = {
                "id": color_obj.id,
                "name": color_obj.name,
            }
            product_colors.append(object)

        representation["color"] = product_colors
        return representation

    def update(self, instance, validated_data):
        uploaded_images_data = validated_data.pop("uploaded_images")
        if validated_data["quantity"] != 0:
            validated_data["is_sold"] = True
        super().update(instance, validated_data)

        # Update or create child objects
        # print(instance.images[0].id)
        images_instances = ProductImage.objects.filter(product=instance)
        for image_instance in images_instances:
            image_instance.delete()

        if uploaded_images_data:
            for product_image in uploaded_images_data:
                ProductImage.objects.create(product=instance, image=product_image)

        return instance

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
    orderdProduct = ProductSerializer(read_only=True)

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
            if (
                ordered_product["quantity"] > product.quantity
                or ordered_product["quantity"] < 1
            ):
                order.delete()
                return Response(
                    "Stock quantity: "
                    + str(product.quantity)
                    + " Entry quantity: "
                    + str(product["quantity"]),
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY,
                )
            product.quantity = product.quantity - ordered_product["quantity"]

            OrderDetail.objects.create(
                order=order,
                product=product,
                quantity=ordered_product["quantity"],
                price=ordered_product["price"],
            )
            product.save()
        return order


class BusinessProfileSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = BusinessProfile
        fields = "__all__"

    def create(self, validated_data):
        address = validated_data.pop("address")
        address_obj = Address.objects.create(**address)
        business_profile = BusinessProfile.objects.create(
            address=address_obj, **validated_data
        )
        return business_profile

    def update(self, instance, validated_data):
        address_data = validated_data.pop("address")

        # Update the parent object
        instance.user = validated_data.get("user", instance.user)
        instance.owner_phone = validated_data.get("owner_phone", instance.owner_phone)
        instance.owner_bio = validated_data.get("owner_bio", instance.owner_bio)
        instance.detials = validated_data.get("detials", instance.detials)
        instance.detials = validated_data.get("detials", instance.detials)
        instance.phone = validated_data.get("phone", instance.phone)
        instance.avator = validated_data.get("avator", instance.avator)
        instance.business_type = validated_data.get(
            "business_type", instance.business_type
        )
        instance.avator = validated_data.get("avator", instance.avator)
        instance.save()

        address_id = instance.address.id
        if address_id:
            address = Address.objects.get(id=address_id)
            address.province = address_data.get("province")
            address.district = address_data.get("district")
            address.area = address_data.get("area")
            address.street = address_data.get("street")
            address.save()
        else:
            Address.objects.create(parent=instance, **address_data)

        return instance


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
                        "User already exists",
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
    # class Meta: needed


class ForgetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

    class Meta:
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email")
        if get_user_model().objects.filter(email=email).exists():
            send_otp_via_email(email, "verification code for reset password")
            return attrs
        else:
            raise serializers.ValidationError("You are not registered")


class ForgetPasswordVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()

    class Meta:
        fields = ["emial", "otp"]

    def validate(self, attrs):
        otp = attrs.get("otp")
        email = attrs.get("email")
        user = get_user_model().objects.get(email=email)
        if user:
            if user.otp == otp:
                user.is_password_changable = True
                user.save()
                return attrs
            else:
                serializers.ValidationError("otp is wrong")
        else:
            serializers.ValidationError("your not register")


class ChangePasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()
    password = serializers.CharField(style={"input_type": "password"})

    def validate(self, attrs):
        otp = attrs.get("otp")
        email = attrs.get("email")
        password = attrs.get("password")
        user = get_user_model().objects.get(email=email)
        if user:
            if user.otp == otp:
                if user.is_password_changable:
                    user.set_password(password)
                    user.is_password_changable = False
                    user.otp = ""
                    user.save()
                    return attrs
                else:
                    serializers.ValidationError("changing password isn't verified")
            else:
                serializers.ValidationError("otp is wrong")
        else:
            serializers.ValidationError("your not register")


class PasswordResetSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    old_password = serializers.CharField(style={"input_type": "password"})
    password1 = serializers.CharField(style={"input_type": "password"})
    password2 = serializers.CharField(style={"input_type": "password"})

    class Meta:
        fields = ["old_password", "password1", "password2"]

    def validate(self, attrs):
        user_id = attrs.get("user_id")
        old_password = attrs.get("old_password")
        password1 = attrs.get("password1")
        password2 = attrs.get("password2")
        user = get_user_model().objects.get(pk=user_id)
        if user.check_password(old_password):
            if password1 == password2:
                user.set_password(password1)
                user.save()
                return attrs
            else:
                serializers.ValidationError("your otp is wrong")
        else:
            serializers.ValidationError("your not register")


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


class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = "__all__"
