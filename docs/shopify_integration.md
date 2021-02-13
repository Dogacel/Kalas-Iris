# Shopify Integration Report

An example e-commerce website is created using shopify which is a limited free trial: [ Kalas-Iris – Opening Soon (myshopify.com) ](https://kalas-iris.myshopify.com/).

It is an example clothing e-commerce website. In the free trial, shopify stores require password protection in order to access the store. To access our example store you can use the password: kalasiris

# Creating an App

There are three types of apps that you can build on Shopify depending on your purpose. Types can be changed after you build. These types are:
* [Public apps](https://shopify.dev/concepts/apps#public-apps)
* [Custom apps](https://shopify.dev/concepts/apps#custom-apps)
* [Private apps](https://shopify.dev/concepts/apps#private-apps)

Public apps can be installed on multiple shopify stores, however, both custom and private apps is builded for single merchants. Thus, in our case we will focus on Public apps.

# Authentication

You can authenticate a public app with OAuth following these steps: https://shopify.dev/tutorials/authenticate-a-public-app-with-oauth

#Using Shopify API’s
There are different types of API’s avaible such as Admin API, Storefront API, Liquid etc. [You can check the website for further information.](https://shopify.dev/concepts/about-apis)

We will focus on [Admin API’s](https://shopify.dev/docs/admin-api) in this document. It is used to read and write information about merchant stores, products, orders etc. It is accessible using either GraphQL or REST. 

# REST Admin API Reference
In order to access the product information and images, we need to use Product APIs. By using these APIs we can retrieve a list of products, count of products, single product, or we can create, update and delete a product.

For updating the categories and attributes, we can use the following properties of a product: 
* A product contains a string of comma separated tags which are used for filtering and search. These tags can be retrieved and updated. 
* A product has a product_type which is for categorization. It is used for filtering and searching the products.

In addition, by using Product Image APIs, we can retrieve a list of all product images in a store. For example responses: https://shopify.dev/docs/admin-api/rest/reference/products/product-image

# Webhook
When a product is added to the store or a product is updated, we can receive notifications about those events via [Webhooks](https://shopify.dev/docs/admin-api/rest/reference/events/webhook). 

Example webhooks that we can use for the following events:
* collections/create, collections/update, collections/delete
* products/create, products/update, products/delete
