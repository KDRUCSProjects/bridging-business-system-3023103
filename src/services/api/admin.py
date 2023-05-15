from django.contrib import admin
from .models import Address, Product, BusinessOwner

# Register your models here.

admin.site.register(Address)
admin.site.register(BusinessOwner)
admin.site.register(Product)
