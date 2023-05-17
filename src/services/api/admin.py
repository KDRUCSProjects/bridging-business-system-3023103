from django.contrib import admin
from .models import Address, Product, BusinessOwner,ProductColor,ProductImage,Category,Ratting,BusinessFavoriteProduct,Message,ContactUs

# Register your models here.

admin.site.register(Address)
admin.site.register(BusinessOwner)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(ProductColor)
admin.site.register(Category)
admin.site.register(Ratting)
admin.site.register(BusinessFavoriteProduct)
admin.site.register(Message)
admin.site.register(ContactUs)