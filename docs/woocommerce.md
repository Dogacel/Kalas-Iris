# WooCommerce Kalas-Iris Integration Report

WooCommerce is a plug-in for WordPress websites. In order to use it, it requries a "Business Plan" Wordpress subscription.

[Here is the link to the template website I launched using WooCommerce](https://wooatasoy.wpcomstaging.com/)

## Creating An App

In order to use webhooks, we need to create install the "WooCommerce" plugin to our WordPress website.

You can find a detailed introduction to the REST API of WooCommerce [here](https://docs.woocommerce.com/document/woocommerce-rest-api/)

The Documentation for WooCommerce REST API can be found [here](https://woocommerce.github.io/woocommerce-rest-api-docs/#introduction).

There is also a [Python Wrapper](https://pypi.org/project/WooCommerce/) for the WooCommerce REST API.

## Getting Started

```python
# Install:
# pip install woocommerce

# Setup:
from woocommerce import API

wcapi = API(
    url="http://example.com", # Your store URL
    consumer_key="consumer_key", # Your consumer key
    consumer_secret="consumer_secret", # Your consumer secret
    wp_api=True, # Enable the WP REST API integration
    version="wc/v3" # WooCommerce WP REST API version
)
```

## REST API Keys

For access to REST API, the user creates an API Key under the Settings/Advanced tab in the Woocommerce dashboard.

![key-generation-gif](https://media.giphy.com/media/NlUEHiu9QamCdOEGJj/giphy.gif)

One can also generate API keys using Application Authentication Endpoint.
The parameters are:

* `app_name` (string) : Name of the Application
* `scope` (string) : Level of access. `read`, `write` and `read-_write`
* `user_id` (string) : User ID in your APP. NOT THE USER ID IN WOOCOMMERCE
* `return_url` (string) : URL the user will be redirected to after authentication
* `callback_url` (string) : URL that will receive the generated API key. Note: this URL should be over HTTPS

Must use `/wc-auth/v1/authorize` endpoint and pass the above parameters as a query string.

Example of how to build an authentication URL:

```python
from urllib.parse import urlencode

store_url = 'http://example.com'
endpoint = '/wc-auth/v1/authorize'
params = {
    "app_name": "My App Name",
    "scope": "read_write",
    "user_id": 123,
    "return_url": "http://app.com/return-page",
    "callback_url": "https://app.com/callback-endpoint"
}
query_string = urlencode(params)

print("%s%s?%s" % (store_url, endpoint, query_string))
```

Example of JSON posted with the API Keys

```json
{
    "key_id": 1,
    "user_id": 123,
    "consumer_key": "ck_xxxxxxxxxxxxxxxx",
    "consumer_secret": "cs_xxxxxxxxxxxxxxxx",
    "key_permissions": "read_write"
}
```

The auth endpoint will send the API Keys in JSON format to the `callback_url</code>

## Authentication

WooCommerce API allows two different ways of authentication:

### Authentication over HTTPS

[Ref](https://woocommerce.github.io/woocommerce-rest-api-docs/?python#authentication-over-https)

Use the REST API Consumer Key as the username and the REST API Consumer Secret as the password.

Example:

```python
from woocommerce import API

wcapi = API(
    url="https://example.com",
    consumer_key="consumer_key",
    consumer_secret="consumer_secret",
    wp_api=True,
    version="wc/v3"
)
```

### Authentication over HTTP (OAuth V1.0)

[Ref](https://woocommerce.github.io/woocommerce-rest-api-docs/?python#authentication-over-http)

We'll be doing a `GET`request.
The **Request URL** will be the endpoint we are posting. e.g, `http://www.example.com/wp-json/wc/v3/orders`

#### Collect Parameters

For using OAuth in python, we can use the [requests-oauthlib](https://pypi.org/project/requests-oauthlib/) library to provide first-class OAuth library support for Requests.

We need to collect every single `oauth_*` parameters except for the `oauth_signature` itself.
The required parameters are `oauth_consumer_key`, `oauth_timestamp`, `oauth_nonce`, `oauth_signature`, and `oauth_signature_method`.

Example signature base string:

`GET&http%3A%2F%2Fwww.example.com%2Fwp-json%2Fwc%2Fv3%2Forders&oauth_consumer_key%3Dabc123%26oauth_signature_method%3DHMAC-SHA1`

For detailed explanation on how to build the signature base string refer to the API link as any further explanation would make this report longer than it should.

## Products API

[Ref](https://woocommerce.github.io/woocommerce-rest-api-docs/?python#products)

The products API allows you to create, view, update, and delete individual, or a batch, of products.
You can create, retrieve, update, delete products. You can also do batch create, update and delete multiple products.

### Product properties

There is a large variation of Product properties. The ones that I find the most important are `id`, `name`, `slug`, `date_created`, `type` , `status`, `description`, `sku`, `price`, `regular_price`, `sale_price`, `total_sales`, `tags`, `attributes`, `images`.
For more, refer [here](https://woocommerce.github.io/woocommerce-rest-api-docs/?python#product-properties)

### Create a Product

```http
POST /wp-json/wc/v3/products
```

Example of how to create a product:

```python
data = {
    "name": "Premium Quality",
    "type": "simple",
    "regular_price": "21.99",
    "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
    "short_description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    "categories": [
        {
            "id": 9
        },
        {
            "id": 14
        }
    ],
    "images": [
        {
            "src": "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg"
        },
        {
            "src": "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg"
        }
    ]
}
wcapi.post("products", data).json()
```

### Retrieve a product

```http
GET /wp-json/wc/v3/products/<id>
```

This API lets you retrieve and view a specific product by ID.

```python
wcapi.get("products/794").json()
```

### Update a product

```http
PUT /wp-json/wc/v3/products/<id>
```

Here is an example where product?id=794's `regular_price` is updated to 24.54.

```python
data = {
    "regular_price": "24.54"
}

wcapi.put("products/794", data).json()
```

### Delete product

```http
DELETE /wp-json/wc/v3/products/<id>
```

```python
wcapi.delete("products/794", params={"force": True}).json()
```

### Batch update products

```http
POST /wp-json/wc/v3/products/batch
```

By default, it's limited up to 100 objects to be created, updated or deleted.

```python
data = {
    "create": [
        {
            "name": "Woo Single #1",
            "type": "simple",
            "regular_price": "21.99",
            "virtual": True,
            "downloadable": True,
            "downloads": [
                {
                    "name": "Woo Single",
                    "file": "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/cd_4_angle.jpg"
                }
            ],
            "categories": [
                {
                    "id": 11
                },
                {
                    "id": 13
                }
            ],
            "images": [
                {
                    "src": "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/cd_4_angle.jpg"
                }
            ]
        },
        {
            "name": "New Premium Quality",
            "type": "simple",
            "regular_price": "21.99",
            "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
            "short_description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            "categories": [
                {
                    "id": 9
                },
                {
                    "id": 14
                }
            ],
            "images": [
                {
                    "src": "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg"
                },
                {
                    "src": "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg"
                }
            ]
        }
    ],
    "update": [
        {
            "id": 799,
            "default_attributes": [
                {
                    "id": 6,
                    "name": "Color,
                    "option": "Green"
                },
                {
                    "id": 0,
                    "name": "Size",
                    "option": "M"
                }
            ]
        }
    ],
    "delete": [
        794
    ]
}

wcapi.post("products/batch", data).json()
```

## Product Attributes API

[Ref](https://woocommerce.github.io/woocommerce-rest-api-docs/?python#product-attributes)

Product attribute properties are `id`, `name`, `slug`, `type`, `order_by` and `has_archives`. `name` is a mandatory property.

* `id` (integer) : Unique identifier for the resource (read only).
* `name` (string) : Attribute name
* `slug` (string) : An alphanumeric identifier for the resource unique to its type.
* `type` (string) : Type of attribute. By default only `select` is supported.
* `order_by` (string) : Default sort order. Options: `menu_order`, `name`, `name_num` and `id`. Default is `menu_order`.
* `has_archives` (boolean) : Enable/Disable attribute archives. Default is `false`.

### Create Product Attribute

* We have the capability of creating the attributes provided from MMFashion with this request.

```http
POST /wp-json/wc/v3/products/attributes
```

Example Code:

```python
data = {
    "name": "Color",
    "slug": "pa_color",
    "type": "select",
    "order_by": "menu_order",
    "has_archives": True
}

wcapi.post("products/attributes", data).json()
```

### Retrieve a product attribute

```http
GET /wp-json/wc/v3/products/attributes/<id>
```

Example Code:

```python
wcapi.get("products/attributes/1").json()
```

### Update a product attribute

```http
PUT /wp-json/wc/v3/products/attributes/<id>
```

Example Code:

```python
data = {
    "order_by": "name"
}

wcapi.put("products/attributes/1", data).json()
```

### Delete a product attribute

```http
DELETE /wp-json/wc/v3/products/attributes/<id>
```

This also will delete all terms from the selected attribute.

Example Code:

```python
wcapi.delete("products/attributes/1", params={"force": True}).json()
```

* `force` (string) : Required to be true, as resource does not support trashing.

### Batch update a product attribute

```http
POST /wp-json/wc/v3/products/attributes/batch
```

Example Code:

```python
data = {
    "create": [
        {
            "name": "Brand"
        },
        {
            "name": "Publisher"
        }
    ],
    "update": [
        {
            "id": 2,
            "order_by": "name"
        }
    ],
    "delete": [
        1
    ]
}

print(wcapi.post("products/attributes/batch", data).json())
```

## Product tags

[Ref](https://woocommerce.github.io/woocommerce-rest-api-docs/?python#product-tags)

### Create a product tag

```http
POST /wp-json/wc/v3/products/tags
```

Example Code:

```python
data = {
    "name": "Leather Shoes"
}

wcapi.post("products/tags", data).json()
```

### Retrieve a product tag

```http
GET /wp-json/wc/v3/products/tags/<id>
```

```python
wcapi.get("products/tags/34").json()
```

### Update a product tag

```http
PUT /wp-json/wc/v3/products/tags/<id>
```

```python
data = {
    "description": "Genuine leather."
}

wcapi.put("products/tags/34", data).json()
```

### Delete a product tag

```http
DELETE /wp-json/wc/v3/products/tags/<id>
```

```python
wcapi.delete("products/tags/34", params={"force": True}).json()
```

* `force`(string) is required to be true, as resource does not support trashing.

## Product categories

[Ref](https://woocommerce.github.io/woocommerce-rest-api-docs/#product-category-properties)

### Create a product category

```http
POST /wp-json/wc/v3/products/categories
```

```python
data = {
    "name": "Clothing",
    "image": {
        "src": "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg"
    }
}

wcapi.post("products/categories", data).json()
```

### Retrieve a product category

```http
GET /wp-json/wc/v3/products/categories/<id>
```

```python
wcapi.get("products/categories/9").json()
```

### Update a product category

```http
PUT /wp-json/wc/v3/products/categories/<id>
```

```python
data = {
    "description": "All kinds of clothes."
}

wcapi.put("products/categories/9", data).json()
```

### Delete a product category

```http
DELETE /wp-json/wc/v3/products/categories/<id>
```

```python
wcapi.delete("products/categories/9", params={"force": True}).json()
```

* `force`parameter is required to be true, as resource does not support trashing.

### Difference between Product Categories, Tags and Attributes

Categories, Tags and Attributes are familiar with each other. For understanging how they differ in WooCommerce, I recommend you to read this [article.](https://code.tutsplus.com/articles/the-beginners-guide-to-woocommerce-product-tags-categories-attributes--cms-22622)
