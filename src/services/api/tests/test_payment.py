import pytest 
from api.models import User,Order,Address,Payment


def test_create_payment(db):

    payer=User.objects.create(username='ali',email='ali@gmail.com',password='khan')
    charged=User.objects.create(username='saboor',email='saboor@gmail.com',password='saboor')
    address1=Address.objects.create(province='Ghazni',district='Center',area='forth housa',street='102')
    order1=Order.objects.create(user=payer,address=address1,create_at='20-2-2023',total=5000)
    payment=Payment.objects.create(payer_business=payer,charged_business=charged,order=order1,amount=10)
    assert  payment.payer_business==payer,payment.charged_business==charged