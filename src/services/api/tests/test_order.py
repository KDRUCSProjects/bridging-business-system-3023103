import pytest 
from api.models import User,Order,Address


def test_create_order(db):

    user1=User.objects.create(username='ali',email='ali@gmail.com',password='khan')
    address1=Address.objects.create(province='Ghazni',district='Center',area='forth housa',street='102')
    order1=Order.objects.create(user=user1,address=address1,create_at='20-2-2023',total=5000)

    assert order1.user==user1,order1.address==address1