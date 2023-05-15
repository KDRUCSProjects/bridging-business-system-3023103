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
