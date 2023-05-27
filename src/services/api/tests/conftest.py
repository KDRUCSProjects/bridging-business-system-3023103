import pytest


from pytest_factoryboy import register
from .factories import CategoryFactory , ColorFactory , ProductFactory , UserFactory

register(CategoryFactory)
register(ProductFactory)
register(ColorFactory)
register(UserFactory)


