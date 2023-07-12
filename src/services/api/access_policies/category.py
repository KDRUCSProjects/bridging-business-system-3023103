from rest_access_policy import AccessPolicy


class CategoryAccessPolicy(AccessPolicy):
    statements = [
        {
            "action": ["list", "retrieve", "create", "update"],
            "principal": "*",
            "effect": "allow",
        },
        {"action": ["destroy"], "principal": "admin", "effect": "allow"},
    ]
