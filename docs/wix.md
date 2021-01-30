# Wix E-Commerce Kalas-Iris Integration Report

[Link to website](https://dogacel.wixsite.com/website) Created using Wix website builder. This is a free-tier website. The website is created as online clothing retail template.

## Creating An App

In order to use webhooks, we should create an app for wix platform and the user can add that app to their website using "Manage Apps" tab under website builder.

We need to add permissions to our app, I have choosen Permission Category, Wix Stores. Under wix stores we have 4 permissions. I have selected all of them just in case.

## Receiving Requests - Webhooks

We can use webhooks to get images and send image annotations. [Link for using wix-webhooks](https://devforum.wix.com/en/article/about-webhooks)

After that, we need to add webhooks. Wix offers many webhooks that we can use. I have planned to use the following webhooks:

For annotation service:

- Product Created: Backend will automatically gather image from product when it is created and will annotate it.

For updating the product database:

- Product Created
- Product Deleted
- Product Changed

## Sending Requests - API

[Link to wix API reference](https://dev.wix.com/api/rest/getting-started) We need OAuth for sending requests, which can be found under Wix Developer App's dashboard.

We will mostly use products in our workflow. [Link to products API reference](https://dev.wix.com/api/rest/wix-stores/catalog/product/product-object)

Once our backend receives a message about a newly created product, it will generate annotations. After that the backend will call [this endpoint](https://dev.wix.com/api/rest/wix-stores/catalog/product/update-product) and will update the product information. We can update the following fields:

- Description: We can update this field to include category / attributes.
- seoData: We can generate a tag per category / attribute

Unfortunately I did not see a category / tags information on product object. I have only seen those two that we can use. We can also create Collections based on categories.
