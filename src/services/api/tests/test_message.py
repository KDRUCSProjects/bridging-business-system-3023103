import pytest 
from api.models import User,Message


def test_create_Message(db):
    sender1=User.objects.create(username='khalid',email='khalid@gmail.com',password='1234')
    recever1=User.objects.create(username='khan',email='khan@gmail.com',password='khan')
    message=Message.objects.create(sender=sender1,recever=recever1,text='how are you',created_at='22-22-2022')
    assert message.sender == sender1,message.recever==recever1