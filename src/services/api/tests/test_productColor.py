import pytest 
from api.models import ProductColor


def test_create_productColor(db):
    product = ProductColor.objects.create(name="red")
    assert product.name == "red"