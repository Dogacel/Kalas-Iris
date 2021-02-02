### WooCommerce Kalas-Iris Integration Report 

WooCommerce is a plug-in for WordPress websites. In order to use it, it requries a "Business Plan" Wordpress subscription.

The API is documented in detail, thus for even detailed information, refer to the links in the document. Below you can find information about the features that we will use in WooCommerce API. The API documentation also incluedes sample requests in cURL, Node.js,  PHP, Python and Ruby. 

All of the links in this document are from the Python Wrapper. 

[Here is the link to the template website I launched using WooCommerce](https://wooatasoy.wpcomstaging.com/)

## Creating An App
In order to use webhooks, we need to create install the "WooCommerce" plugin to our WordPress website. 

For access to REST API, the user creates an API Key under the Settings/Advanced tab in the Woocommerce dashboard. 
![](https://media.giphy.com/media/NlUEHiu9QamCdOEGJj/giphy.gif)

You can find a detailed introduction to the REST API of WooCommerce [here](https://docs.woocommerce.com/document/woocommerce-rest-api/)

The Documentation for WooCommerce REST API can be found [here](https://woocommerce.github.io/woocommerce-rest-api-docs/#introduction).

There is also a [Python Wrapper](https://pypi.org/project/WooCommerce/) for the WooCommerce REST API.

## Authentication 
WooCommerce API allows two different ways of authentication: [Authentication over HTTPS](https://woocommerce.github.io/woocommerce-rest-api-docs/?python#authentication-over-https) 
and [Authentication over HTTP - OAuth V1.0 -](https://woocommerce.github.io/woocommerce-rest-api-docs/?python#authentication-over-http)

## Products API 
[Link](https://woocommerce.github.io/woocommerce-rest-api-docs/?python#products)

The products API allows you to create, view, update, and delete individual, or a batch, of products.
You can create, retrieve, update, delete products. You can also do batch create, update and delete multiple products. 

## Product Attributes API
[Attributes](https://woocommerce.github.io/woocommerce-rest-api-docs/?python#product-attributes)
[Categories](https://woocommerce.github.io/woocommerce-rest-api-docs/?python#product-category-properties)

The product attributes API allows you to create, view, update, and delete individual, or a batch, of product attributes. 
I think this feaute would work well with annotation output of MMFashion. 

## Webhooks
Webhooks can be managed via the WooCommerce settings screen or by using the REST API endpoints. 

For visual guideline refer [here](https://docs.woocommerce.com/document/webhooks/).

For the API guide, refer [here](https://woocommerce.github.io/woocommerce-rest-api-docs/?python#webhooks)

 
