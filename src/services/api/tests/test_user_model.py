import pytest 
from api.models import User


def test_create_user(db):
    user1=User.objects.create(username='khalid',email='khalid@gmail.com',password='1234')
    assert user1.username == "khalid2",user1.email=='khalid@gmail.com'