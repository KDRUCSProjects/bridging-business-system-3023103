from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import User

# Create your models here.

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid


class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, null=True, blank=True)
    is_password_changable = models.BooleanField(default=False)

    def name(self):
        return self.first_name + " " + self.last_name

    def __str__(self):
        return self.username


class Address(models.Model):
    province = models.CharField(max_length=60)
    district = models.CharField(max_length=60)
    area = models.CharField(max_length=60)
    street = models.CharField(max_length=60)

    def __str__(self):
        return self.province + "-" + self.district


class Category(models.Model):
    name = models.CharField(max_length=30)
    image = models.ImageField(blank=True, null=True)

    def __str__(self):
        return self.name


class BusinessProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    business_name = models.CharField(null=True, blank=True, max_length=200)
    owner_phone = PhoneNumberField()
    owner_bio = models.TextField(blank=True, null=True)
    detials = models.TextField(blank=True, null=True)
    phone = PhoneNumberField()
    avator = models.ImageField(blank=True, null=True)
    business_type = models.CharField(max_length=60)
    address = models.OneToOneField(Address, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.user)


class ProductColor(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=60)
    description = models.TextField(blank=True)
    quantity = models.IntegerField()
    price = models.FloatField()
    color = models.ManyToManyField(
        ProductColor, blank=True, null=True, related_name="colors"
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_sold = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user) + " product " + self.name

    class Meta:
        ordering = ["created_at"]


class ProductImage(models.Model):
    image = models.ImageField(blank=True, null=True)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )

    def __str__(self):
        return self.image.name


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender")
    recever = models.ForeignKey(User, on_delete=models.CASCADE, related_name="recever")
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.sender) + " to " + str(self.recever)


class BusinessFavoriteProduct(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user) + " favorite " + self.product.name


class ContactUs(models.Model):
    text = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)


class Ratting(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="ratting_bussiness"
    )
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="productRatting"
    )
    ratting_stars = models.IntegerField(default=0)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.ForeignKey(
        Address, on_delete=models.CASCADE, related_name="address"
    )
    create_at = models.DateTimeField(auto_now_add=True)
    total = models.FloatField()

    def __str__(self):
        return "business-" + str(self.user) + " total-" + str(self.total)


class OrderDetail(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_details"
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.FloatField()

    @property
    def total_price(self):
        return self.quantity * self.price

    def __str__(self):
        return "product-" + str(self.product) + "quantity-" + str(self.quantity)


class Payment(models.Model):
    payer_business = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="payer_business"
    )
    charged_business = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="charged_business"
    )
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    amount = models.FloatField()
