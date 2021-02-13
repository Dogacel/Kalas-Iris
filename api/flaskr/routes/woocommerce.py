from flask import Blueprint, request, url_for, redirect, session, current_app, jsonify
from flask.wrappers import Response
from ..wcapi import woocommerce

woocommerce_route = Blueprint('woocommerce_route', __name__)

@woocommerce_route.route("/createProduct", methods='POST')
def createProduct():
    product_data = request.files.get('product_data')
    woocommerce.wcapi.post("products", product_data)

@woocommerce_route("/retrieveProduct/<id>", methods='GET')
def retrieveProduct(id):
    woocommerce.wcapi.get(f'products/{id}')

@woocommerce_route("/updateProduct/<id>", methods='POST')
def updateProduct(id):
    product_data = request.files.get('product_data')
    woocommerce.wcapi.put(f'products/{id}', product_data)

@woocommerce_route("/listAllProducts", methods='GET')
def listAllProducts():
    woocommerce.wcapi.get("products")