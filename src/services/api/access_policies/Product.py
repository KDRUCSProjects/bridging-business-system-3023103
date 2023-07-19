from rest_access_policy import AccessPolicy


class ProductAccessPolicy(AccessPolicy):
    statements = [
        {
            "action": ["list", "retrieve", "create"],
            "principal": "*",
            "effect": "allow",
        },
        {
            "action": ["destroy", "update"],
            "principal": "*",
            "effect": "allow",
            "condition": "is_author",
        },
    ]

    def is_author(self, request, view, action) -> bool:
        product = view.get_object()
        return product.user == request.user
