from rest_access_policy import AccessPolicy


class ProductAccessPolicy(AccessPolicy):
    statements = [
        {
            "action": ["list", "retrieve"],
            "principal": "*",
            "effect": "allow",
        },
        {
            "action": ["create"],
            "principal": "authenticated",
            "effect": "allow",
        },
        {
            "action": ["destroy", "update"],
            "principal": "authenticated",
            "effect": "allow",
            "condition": "is_author",
        },
    ]

    def is_author(self, request, view, action) -> bool:
        product = view.get_object()
        return product.user == request.user
