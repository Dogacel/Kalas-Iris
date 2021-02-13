from flask import Blueprint, json, request, url_for, redirect, session, current_app, jsonify
from flask.wrappers import Response
from ..wcapi import woocommerce

woocommerce_route = Blueprint('woocommerce_route', __name__)

# Products
@woocommerce_route.route("/createProduct", methods=['POST'])
def createProduct():
    product_data = request.form.get('product_data')
    return jsonify(woocommerce.wcapi.post("products", product_data).json())

@woocommerce_route.route("/retrieveProduct/<id>", methods=['GET'])
def retrieveProduct(id):
    return jsonify(woocommerce.wcapi.get(f'products/{id}').json())

@woocommerce_route.route("/updateProduct/<id>", methods=['POST'])
def updateProduct(id):
    product_data = request.form.get('product_data')
    return jsonify(woocommerce.wcapi.put(f'products/{id}', product_data).json())

@woocommerce_route.route("/listAllProducts", methods=['GET'])
def listAllProducts():
    return jsonify(woocommerce.wcapi.get("products").json())

# Product Categories 
@woocommerce_route("/createProductCategory", methods=['POST'])
def createProductCategory():
    category_data = request.form.get('category_data')
    return jsonify(woocommerce.wcapi.post("products/categories", category_data).json())

@woocommerce_route("/retrieveProductCategory/<id>", methods=['GET'])
def retrieveProductCategory(id):
        return jsonify(woocommerce.wcapi.get(f'products/categories/{id}').json())

@woocommerce_route.route("/updateProductCategory/<id>", methods=['POST'])
def updateProduct(id):
    category_data = request.form.get('category_data')
    return jsonify(woocommerce.wcapi.put(f'products/categories/{id}', category_data).json())

@woocommerce_route.route("/listAllProductCategories", methods=['GET'])
def listAllProductCategories():
    return jsonify(woocommerce.wcapi.get("products/categories").json())

# Product Attributes
@woocommerce_route.route("/createProductAttribute", methods=['POST'])
def createProductAttribute():
    attribute_data = request.form.get('attribute_data')
    return jsonify(woocommerce.api.post("products/attributes", attribute_data).json())

@woocommerce_route.route("/retrieveProductAttribute/<id>", methods=['GET'])
def retrieveProductAttribute(id):
    return jsonify(woocommerce.wcapi.get(f'products/attributes/{id}').json())

@woocommerce_route.route("/updateProductAttribute/<id>", methods=['PUT'])
def updateProductAttribute(id):
    attribute_data = request.form.get('attribute_data')
    return jsonify(woocommerce.wcapi.put(f'products/attributes/{id}', attribute_data).json())

@woocommerce_route.route("/listAllProductAttributes", methods=['GET'])
def listAllProductAttributes():
    return jsonify(woocommerce.wcapi.get("products/attributes").json())

# Product Tags
@woocommerce_route.route("/createProductTag", methods=['POST'])
def createProductAttribute():
    tag_data = request.form.get('tag_data')
    return jsonify(woocommerce.api.post("products/tags", tag_data).json())

@woocommerce_route.route("/retrieveProductTag/<id>", methods=['GET'])
def retrieveProductAttribute(id):
    return jsonify(woocommerce.wcapi.get(f'products/tags/{id}').json())

@woocommerce_route.route("/updateProductTag/<id>", methods=['PUT'])
def updateProductAttribute(id):
    tag_data = request.form.get('tag_data')
    return jsonify(woocommerce.wcapi.put(f'products/tags/{id}', tag_data).json())

@woocommerce_route.route("/listAllProductTags", methods=['GET'])
def listAllProductAttributes():
    return jsonify(woocommerce.wcapi.get("products/tags").json())