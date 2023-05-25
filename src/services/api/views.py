from django.shortcuts import render
from rest_framework import viewsets, permissions
from django.contrib.auth import login
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from .models import (
    Product,
    ProductImage,
    BusinessProfile,
    BusinessOwner,
    OrderDetail,
    Order,
    ProductColor,
    Category,
    Address,
    Message,
    BusinessFavoriteProduct,
    Ratting,
    ContactUs,
    Payment,
)
from .serializers import (
    ProductSerializer,
    ProductImageSerializer,
    BusinessProfileSerializer,
    BusinessOwnerSerializer,
    OrderSerializer,
    OrderDetailSerializer,
    ProductColorSerializer,
    CategorySeralizer,
    AddressSerializer,
    MessageSerializer,
    BusinessFavoriteProductSerializer,
    RattingSerializer,
    PaymentSerializer,
    ContactUsSerializer,
)


# Create your views here.


class PrdocutViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderDetailViewSet(viewsets.ModelViewSet):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer


class BusinessProfileViewSet(viewsets.ModelViewSet):
    queryset = BusinessProfile.objects.all()
    serializer_class = BusinessProfileSerializer


class BusinessOwnerViewSet(viewsets.ModelViewSet):
    queryset = BusinessOwner.objects.all()
    serializer_class = BusinessOwnerSerializer


class ProductColorViewSet(viewsets.ModelViewSet):
    queryset = ProductColor.objects.all()
    serializer_class = ProductColorSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySeralizer


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class BusinessFavoriteProductViewSet(viewsets.ModelViewSet):
    queryset = BusinessFavoriteProduct.objects.all()
    serializer_class = BusinessFavoriteProductSerializer


class RattingViewSet(viewsets.ModelViewSet):
    queryset = Ratting.objects.all()
    serializer_class = RattingSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class ContectUsViewSet(viewsets.ModelViewSet):
    queryset = ContactUs.objects.all()
    serializer_class = RattingSerializer


class UserLoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return super(UserLoginView, self).post(request, format=None)



def decrease_cart(request,pk):
    item=get_object_or_404(product,pk=pk)
    order_qs=order.objects.filter(user=request.user,ordered=False)
    if order_qs.exists():
        order=order_qs[0]
        if order.orderiteam.filter(item=item).exists():
            order_item=cart.objects.filter(item=item,user=request.user,purchased=false)
            if order_item.quantity > 1:
                order_item.quantity -= 1
                order_item.save()
                return redirect('order:cart')
            else:
                order.orderitem.remove(order_item)
                order_item.delete()
                return redirect('store:index')
        else:
            return redirect('store:index')
    else:
        return redirect('store:index') 

        


def increase_cart(request,pk):
    item=get_object_or_404(product,pk=pk)
    order_qs=order.objects.filter(user=request.user,ordered=False)
    if order_qs.exists():
        order=order_qs[0]
        if order.orderiteam.filter(item=item).exists():
            order_item=cart.objects.filter(item=item,user=request.user,purchased=false)
            if order_item.quantity >= 1:
                order_item.quantity += 1
                order_item.save()
                return redirect('order:cart')
            else:
                return redirect('store:index')
        else:
            return redirect('store:index')
    else:
        return redirect('store:index') 
    

