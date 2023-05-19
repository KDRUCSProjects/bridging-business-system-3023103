from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.


class BusinessOwner(models.Model):
    name = models.CharField(max_length=60)
    bio = models.TextField(blank=True, null=True)
    phone = PhoneNumberField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.name


class Address(models.Model):
    province = models.CharField(max_length=60)
    district = models.CharField(max_length=60)
    area = models.CharField(max_length=60)
    street = models.CharField(max_length=60)

    def __str__(self):
        return self.province + "-" + self.district


class Category(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Business(models.Model):
    name = models.CharField(max_length=60)
    business_owner = models.OneToOneField(BusinessOwner, on_delete=models.CASCADE)
    detial = models.TextField(blank=True, null=True)
    email = models.EmailField()
    phone = PhoneNumberField()
    Business_profile = models.ImageField(upload_to="image/", blank=True, null=True)
    business_type = models.CharField(max_length=60)
    address = models.OneToOneField(Address, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class ProductColor(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=60)
    description = models.TextField(blank=True)
    quantity = models.IntegerField()
    price = models.FloatField()
    color = models.ManyToManyField(ProductColor, blank=True, null=True)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.business.name + " product " + self.name


class ProductImage(models.Model):
    image = models.ImageField(upload_to="image/", blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.image.name


class Message(models.Model):
    sender = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="sender"
    )
    recever = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="recever"
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.sender.name + " to " + self.recever.name


class BusinessFavoriteProduct(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.business.name + " favorite " + self.product.name


class ContactUs(models.Model):
    text = models.TextField()
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.business.name


class Ratting(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    ratting_stars = models.IntegerField(default=0)


class Order(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)
    total = models.FloatField()

    def __str__(self):
        return "business-" + str(self.business) + " total-" + str(self.total)


class OrderDetail(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order")
    quantity = models.PositiveIntegerField(default=1)
    price = models.FloatField()

    @property
    def total_price(self):
        return self.quantity * self.price

    def __str__(self):
        return "product-" + str(self.product) + "quantity-" + str(self.quantity)


class Payment(models.Model):
    payer_business = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="payer_business"
    )
    charged_business = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="charged_business"
    )
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
