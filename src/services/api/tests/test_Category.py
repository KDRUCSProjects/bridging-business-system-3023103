import pytest 
from api.models import Category


def test_create_category(db):
    category=Category.objects.create(name='Computer',image='khan.jpg')
    assert category.name == "Computer"