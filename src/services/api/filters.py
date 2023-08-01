import django_filters
from .models import Product, BusinessProfile


class ProductFilter(django_filters.FilterSet):
    price__gt = django_filters.NumberFilter(field_name="price", lookup_expr="gt")
    price__lt = django_filters.NumberFilter(field_name="price", lookup_expr="lt")
    color = django_filters.NumberFilter(field_name="color", lookup_expr="exact")

    class Meta:
        model = Product
        fields = [
            "user",
            "category",
        ]


class BusinessProfileFilter(django_filters.FilterSet):
    # exact must remove
    business_type = django_filters.CharFilter(
        field_name="business_type", lookup_expr="contains"
    )

    class Meta:
        model = BusinessProfile
        fields = ["business_type"]
