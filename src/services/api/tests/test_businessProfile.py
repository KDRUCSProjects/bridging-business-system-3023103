import pytest 
from api.models import BusinessProfile,User,BusinessOwner,Address


def test_create_businessProfile(db):
    user1=User.objects.create(username='khalid',email='khalid@gmail.com',password='1234')
    owner=BusinessOwner.objects.create(name='khalid',bio='i am from Ghazni',phone='+93792108632',email='khalid@gmail.com')
    address1=Address.objects.create(province='Ghazni',district='Center',area='forth housa',street='102')
    profile=BusinessProfile.objects.create(user=user1,
                                           business_owner=owner,
                                           detial='this is a business profile',
                                           phone='+92789988675',
                                           business_type='Trading',
                                           address=address1)
    

    assert profile.user == user1