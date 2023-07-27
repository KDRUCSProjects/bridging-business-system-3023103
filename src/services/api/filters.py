import django_filters
from .models import Product


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
