from django.contrib import admin
from .models import (
    Address,
    Product,
    ProductColor,
    ProductImage,
    Category,
    BusinessProfile,
    Order,
    OrderDetail,
    Payment,
    Ratting,
    BusinessFavoriteProduct,
    Message,
    ContactUs,
    User,
)


# Register your models here.


class BusinessProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "business_type", "phone"]

    class Meta:
        model = BusinessProfile


class AddressAdmin(admin.ModelAdmin):
    list_display = ["province", "district", "area", "street"]

    class Meta:
        model = Address


class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]

    class Meta:
        model = Category


class ProductImageAdmin(admin.StackedInline):
    model = ProductImage
    extra = 1


class ProductColorAdmin(admin.ModelAdmin):
    list_display = ["name"]

    class Meta:
        model = ProductColor


class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "quantity", "price", "user"]
    inlines = [ProductImageAdmin]

    class Meta:
        model = Product


class MessageAdmin(admin.ModelAdmin):
    list_display = ["sender", "recever", "created_at"]

    class Meta:
        model = Message


class BusinessFavoriteProductAdmin(admin.ModelAdmin):
    list_display = ["user", "product"]

    class Meta:
        model = BusinessFavoriteProduct


class ContactUsAdmin(admin.ModelAdmin):
    list_display = ["user", "create_at", "text"]

    class Meta:
        model = ContactUs


class RattingAdmin(admin.ModelAdmin):
    list_display = ["user", "product", "ratting_stars"]

    class Meta:
        model = Ratting


class PaymentAdmin(admin.StackedInline):
    model = Payment
    extra = 1


class OrderDetialAdmin(admin.StackedInline):
    model = OrderDetail
    extra = 1


class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderDetialAdmin, PaymentAdmin]

    class Meta:
        model = Order


admin.site.register(Address, AddressAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductColor, ProductColorAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Ratting, RattingAdmin)
admin.site.register(BusinessFavoriteProduct)
admin.site.register(Message, MessageAdmin)
admin.site.register(ContactUs, ContactUsAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(BusinessProfile, BusinessProfileAdmin)
admin.site.register(User)
