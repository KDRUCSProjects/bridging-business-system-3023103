from django.contrib import admin
from .models import Address, Product, BusinessOwner,ProductColor,ProductImage,Category

# Register your models here.

admin.site.register(Address)
admin.site.register(BusinessOwner)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(ProductColor)
admin.site.register(Category)
