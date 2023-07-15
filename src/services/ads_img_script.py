import random
import json
from datetime import datetime

data = []

for i in range(50):
    ad_data = {
        "model": "api.product_image",
        "pk": i+1,
        "fields": { "product": i+1,
        "image": "https://picsum.photos/200/200/?random" 
        }
        
    }
    data.append(ad_data)

print(json.dumps(data, indent=2))

