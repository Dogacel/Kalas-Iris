from woocommerce import API
import os

class woocommerce:
        wcapi = API(
            url="https://wooatasoy.wpcomstaging.com",
            consumer_key = os.getenv("WOO_CONSUMER_KEY"),
            consumer_secret = os.getenv("WOO_CONSUMER_SECRET"),
            wp_api = True,
            version = "wc/v3"
        )
        
