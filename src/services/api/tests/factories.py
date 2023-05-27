import factory 

from ..models import *

from django.contrib.auth.models import User

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
    username = "saboor hemat"



class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category
    name = "computer"

class ColorFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ProductColor
    name = "yellow"

class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product
    name = "Dell 3432"
    description = "this is a computer"
    quantity = 2
    price = 12000
    color = factory.SubFactory(ColorFactory)
    user = factory.SubFactory(UserFactory)
    cagetory = factory.SubFactory(CategoryFactory)