import pytest 
from api.models import Order,Product,Address,User,Category,OrderDetail


def test_create_order_details(db):

    user1=User.objects.create(username='ali',email='ali@gmail.com',password='khan')
    address1=Address.objects.create(province='Ghazni',district='Center',area='forth housa',street='102')
    order1=Order.objects.create(user=user1,address=address1,create_at='20-2-2023',total=5000)
    category1=Category.objects.create(name='apple')
    product1= Product.objects.create(name="Books",description="safdsa",quantity=12,price=23,user=user1,category=category1)
    detail=OrderDetail.objects.create(order=order1,product=product1,quantity=10,price=200)
    assert detail.order==order1,detail.quantity==10