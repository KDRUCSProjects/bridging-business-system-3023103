import pytest 


def test_product(product_factory):
    product = product_factory.build()
    assert product.name == "Dell 3432"
    assert True