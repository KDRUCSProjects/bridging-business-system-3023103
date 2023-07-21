import pytest 
from api.models import Product

# def test_product(product_factory):
#     product = product_factory.build()
#     assert product.name == "Dell 3432"



def test_create_product(db):
    product = Product.objects.create(name="Books",description="safdsa",quantity=12,price=23,color=1,user=2,category=3)
    assert product.name == "Books"