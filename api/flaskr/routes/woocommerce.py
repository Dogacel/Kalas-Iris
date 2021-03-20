from flask import Blueprint, json, request, url_for, redirect, session, current_app, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..db import mongo
from woocommerce import API
import urllib.request
import requests
from .image import mmfashionAPIAddress
from PIL import Image
import os, os.path

woocommerce_route = Blueprint('woocommerce_route', __name__)

# Authenticate
def withAuthWC(currentUser):
    integrations = mongo.integrations.db.integrations
    try:
        integration_info = integrations.find_one({"user": currentUser, "type": "woo"})
    except:
        return jsonify("Could not find integration for the user")
    
    try:
        websiteURL = integration_info["websiteURL"]
        consumerKey = integration_info["consumerKey"]
        consumerSecret = integration_info["consumerSecret"]
    except:
        return jsonify("Could not fetch user credentials for woocommerce")

    wcapi = API(
            url=websiteURL,
            consumer_key = consumerKey,
            consumer_secret = consumerSecret,
            wp_api = True,
            version = "wc/v3"
        )
        
    return wcapi
        
# Products
@woocommerce_route.route("/createProduct", methods=['POST'])
@jwt_required
def createProduct():
    product_data = request.form.get('product_data')
    currentUser = get_jwt_identity()

    return jsonify(withAuthWC(currentUser).post("products", product_data).json())

@woocommerce_route.route("/retrieveProduct/<id>", methods=['GET'])
@jwt_required
def retrieveProduct(id):
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).get(f'products/{id}').json())

@woocommerce_route.route("/updateProduct/<id>", methods=['POST'])
@jwt_required
def updateProduct(id):
    product_data = request.form.get('product_data')
    currentUser = get_jwt_identity()

    return jsonify(withAuthWC(currentUser).put(f'products/{id}', product_data).json())

@woocommerce_route.route("/listAllProducts", methods=['GET'])
@jwt_required
def listAllProducts():
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).get("products").json())

@woocommerce_route.route("/newProductCreated", methods=['POST'])
def newProductCreated():
    payload = request.get_json()

    try:
        name = payload['name']
        id = payload['id']
        categories = payload['categories']
        tags = payload['tags']
        permalink = payload['permalink']
        images = payload['images']
    except: 
        return jsonify("An error occured on the payload"), 422
    
    # TODO: Forward the product images instead of uploading
    annotations = list()
    for image in images:
        # Download the image
        urllib.request.urlretrieve(image['src'], image['name'])
        
        imageFile = Image.open(image['name'])
        annotations.append(jsonify(requests.post(f'{mmfashionAPIAddress}/annotate',
                                 files={'image' : imageFile}).json()))

    for field, possible_values in annotations.items():
        print(field, possible_values)
    ### 
    return jsonify({'name': name, 'id': id, 'categories': categories, 'tags': tags, 'permalink': permalink, 'images': images})

# Product Categories 
@woocommerce_route.route("/createProductCategory", methods=['POST'])
@jwt_required
def createProductCategory():
    category_data = request.form.get('category_data')
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).post("products/categories", category_data).json())

@woocommerce_route.route("/retrieveProductCategory/<id>", methods=['GET'])
@jwt_required
def retrieveProductCategory(id):
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).get(f'products/categories/{id}').json())

@woocommerce_route.route("/updateProductCategory/<id>", methods=['POST'])
@jwt_required
def updateProductCategory(id):
    category_data = request.form.get('category_data')
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).put(f'products/categories/{id}', category_data).json())

@woocommerce_route.route("/listAllProductCategories", methods=['GET'])
@jwt_required
def listAllProductCategories():
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).get("products/categories").json())

# Product Attributes
@woocommerce_route.route("/createProductAttribute", methods=['POST'])
@jwt_required
def createProductAttribute():
    attribute_data = request.form.get('attribute_data')
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).post("products/attributes", attribute_data).json())

@woocommerce_route.route("/retrieveProductAttribute/<id>", methods=['GET'])
@jwt_required
def retrieveProductAttribute(id):
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).get(f'products/attributes/{id}').json())

@woocommerce_route.route("/updateProductAttribute/<id>", methods=['PUT'])
@jwt_required
def updateProductAttribute(id):
    attribute_data = request.form.get('attribute_data')
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).put(f'products/attributes/{id}', attribute_data).json())

@woocommerce_route.route("/listAllProductAttributes", methods=['GET'])
@jwt_required
def listAllProductAttributes():
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).get("products/attributes").json())

# Product Tags
@woocommerce_route.route("/createProductTag", methods=['POST'])
@jwt_required
def createProductTag():
    tag_data = request.form.get('tag_data')
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).post("products/tags", tag_data).json())

@woocommerce_route.route("/retrieveProductTag/<id>", methods=['GET'])
@jwt_required
def retrieveProductTag(id):
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).get(f'products/tags/{id}').json())

@woocommerce_route.route("/updateProductTag/<id>", methods=['PUT'])
@jwt_required
def updateProductTag(id):
    tag_data = request.form.get('tag_data')
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).put(f'products/tags/{id}', tag_data).json())

@woocommerce_route.route("/listAllProductTags", methods=['GET'])
@jwt_required
def listAllProducTags():
    currentUser = get_jwt_identity()
    return jsonify(withAuthWC(currentUser).get("products/tags").json())