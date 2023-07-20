import pytest 


def test_productcolor(ColorFactory):
    product = ColorFactory.build()
    assert product.name == "yellow"