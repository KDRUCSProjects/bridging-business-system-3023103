import pytest 
from api.models import User,ContactUs


def test_create_contactUs(db):

    user1=User.objects.create(username='khan',email='khan@gmail.com',password='khan')
    contactUs=ContactUs.objects.create(text='i am ahmad from afghanistan',user=user1,create_at='20-2-2020')
    assert  contactUs.text=="i am ahmad from afghanistan",contactUs.user==user1