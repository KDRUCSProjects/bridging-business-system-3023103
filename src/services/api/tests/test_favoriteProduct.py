import pytest 
from api.models import BusinessFavoriteProduct,User,Product,Category


def test_create_favoriteProduct(db):

    user1=User.objects.create(username='khan',email='khan@gmail.com',password='khan')
    category1=Category.objects.create(name='apple')
    product1=Product.objects.create(name="Books",description="safdsa",quantity=12,price=23,user=user1,category=category1)
    favorite=BusinessFavoriteProduct.objects.create(user=user1,product=product1)
    assert  favorite.user== user1,favorite.product==product1