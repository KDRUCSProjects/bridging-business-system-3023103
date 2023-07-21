import pytest 
from api.models import BusinessOwner


def test_create_user(db):
    owner=BusinessOwner.objects.create(name='khalid',bio='i am from Ghazni',phone='+93792108632',email='khalid@gmail.com')
    assert owner.name == "khalid"
