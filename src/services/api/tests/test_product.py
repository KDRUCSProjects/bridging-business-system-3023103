import pytest 
from api.models import Product,User,Category,ProductColor


def test_create_product(db):
    color1=ProductColor.objects.create(name='red')
    user1=User.objects.create(username='khaldk',email='khan@gmail.com',password='1234')
    category1=Category.objects.create(name='apple')
    product = Product.objects.create(name="Books",description="safdsa",quantity=12,price=23,user=user1,category=category1)
    assert product.name == "Books",product.user==user1