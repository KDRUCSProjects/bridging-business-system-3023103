import pytest 
from api.models import Address


def test_create_Address(db):
    address=Address.objects.create(province='Ghazni',district='Center',area='forth housa',street='102')
    assert address.province == "Ghazni",address.district=='Center'