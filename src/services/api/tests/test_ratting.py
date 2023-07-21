import pytest 
from api.models import User,Product,Category,Ratting


def test_create_ratting(db):

    user1=User.objects.create(username='khan',email='khan@gmail.com',password='khan')
    category1=Category.objects.create(name='apple')
    product1=Product.objects.create(name="Books",description="safdsa",quantity=12,price=23,user=user1,category=category1)
    ratting=Ratting.objects.create(user=user1,product=product1,ratting_stars=300)
    assert  ratting.ratting_stars==300,ratting.product==product1