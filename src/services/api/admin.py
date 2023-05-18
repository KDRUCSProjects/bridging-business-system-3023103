from django.contrib import admin
from .models import (
    Address,
    Product,
    BusinessOwner,
    ProductColor,
    ProductImage,
    Category,
    Business,
    Order,
    OrderDetail,
    Payment,
    Ratting,
    BusinessFavoriteProduct,
    Message,
    ContactUs,
)


# Register your models here.
class ProductImageAdmin(admin.StackedInline):
    model = ProductImage
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "quantity", "price", "business"]
    inlines = [ProductImageAdmin]

    class Meta:
        model = Product


class OrderDetialAdmin(admin.StackedInline):
    model = OrderDetail
    extra = 1


class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderDetialAdmin]

    class Meta:
        model = Order


admin.site.register(Address)
admin.site.register(BusinessOwner)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage)
admin.site.register(ProductColor)
admin.site.register(Category)
admin.site.register(Ratting)
admin.site.register(BusinessFavoriteProduct)
admin.site.register(Message)
admin.site.register(ContactUs)
admin.site.register(Order, OrderAdmin)
admin.site.register(Business)
admin.site.register(Payment)
