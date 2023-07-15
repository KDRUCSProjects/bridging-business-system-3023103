import random
import json
from datetime import datetime

data = []

for i in range(50):
    ad_data = {
        "model": "api.product",
        "pk": i+10,
        "fields": {
            "category": random.randint(1, 30),
            "color": random.randint(1 , 2) , 
            "user": random.randint(1, 1),
            "name": "Rain-X Latitude Wipers",
            "quantity": random.randint(1, 5),
            "description": "Brand new Rain-X Latitude windshield wipers. Size 24 inches and 18 inches.",
            "price": round(random.uniform(10, 1000), 2),
            "created_at": datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            "updated_at": datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
        }
    }
    data.append(ad_data)

print(json.dumps(data, indent=2))
