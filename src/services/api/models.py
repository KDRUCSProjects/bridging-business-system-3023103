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


class Product(models.Model):
    name = models.CharField(max_length=60)
    description = models.TextField(blank=True)
    quantity = models.IntegerField()
    price = models.FloatField()
    # business=models.ForeignKey(Business,on_delete=models.CASCADE)
    # category=models.ForeignKey(Category, on_delete=models.CASCADE)
    def __str__(self):
        return self.name



class Category(models.Model):
    name=models.CharField(max_length=30)
    def __str__(self):
        return self.name


class ProductColor(models.Model):
    name=models.CharField(max_length=30)
    product_id=models.ForeignKey(Product,on_delete=models.CASCADE)
    def __str__(self):
        return self.name


class ProductImage(models.Model):
    url=models.ImageField(upload_to= "image/")
    product_id=models.ForeignKey(Product,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.url

class Message(models.Model):
    # sender_id=models.ForeignKey(Business,on_delete=models.CASCADE)
    # recever_id=models.ForeignKey(Business,on_delete=models.CASCADE)
    text=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.text


class BusinessFavoriteProduct(models.Model):
    # business_id=models.ForeignKey(Business,on_delete=models.CASCADE)
      product_id=models.ForeignKey(Product,on_delete=models.CASCADE)


class ContactUs(models.Model):
    text=models.TextField()
    # business_id=models.ForeignKey(Business,on_delete=models.CASCADE)
    def __str__(self):
        return self.text


class Ratting(models.Model):
    # business_id=models.ForeignKey(Business,on_delete=models.CASCADE)
    # product_id=models.ForeignKey(Product,on_delete=models.CASCADE)
      ratting_stars=models.IntegerField(default=0)





















