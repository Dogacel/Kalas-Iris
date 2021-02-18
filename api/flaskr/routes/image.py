from flask import Blueprint, request, url_for, redirect, session, current_app, jsonify
from flask.wrappers import Response
from base64 import b64encode
from ..db import mongo
import requests

image_route = Blueprint('image_route', __name__)
mmfashionAPIAddress = "http://34.107.125.106"

@image_route.route('/uploadProductImage', methods=(['POST']))
def uploadProductImage():
    file = request.files.get('image')
    fashion_image_collection = mongo.fashionImages.db.images
    mongo.fashionImages.save_file(file.filename, file)
    fashion_image_collection.insert({'photo_name': file.filename})
    # Return more meaningful data maybe

    return Response('Done!')


@image_route.route('/file/<filename>')
def file(filename):
    return mongo.fashionImages.send_file(filename)


@image_route.route('/annotateImage', methods=['POST'])
def annotate():
    image = request.files.get('image')
    dictToSend = {'image': image}
    return Response(requests.post(f'{mmfashionAPIAddress}/annotate', data=dictToSend))
