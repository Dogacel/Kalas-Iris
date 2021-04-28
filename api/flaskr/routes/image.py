import base64
import random
import string
from flask import Blueprint, request, url_for, redirect, session, current_app, jsonify
from flask.wrappers import Response
from base64 import b64encode
from ..db import mongo
import requests
from bson.json_util import dumps

image_route = Blueprint('image_route', __name__)
mmfashionAPIAddress = "http://34.91.142.201"


@image_route.route('/uploadProductImage', methods=(['POST']))
def uploadProductImage():
    file = request.files.get('image')
    fashion_image_collection = mongo.fashionImages.db.images
    mongo.fashionImages.save_file(file.filename, file)
    fashion_image_collection.insert({'photo_name': file.filename})
    # Return more meaningful data maybe

    return jsonify('Done!')


@image_route.route('/file/<filename>')
def fileRead(filename):
    return mongo.fashionImages.send_file(filename)


@image_route.route('/history')
def history():
    annotation_collection = mongo.fashionImages.db.annotations

    return dumps(list(annotation_collection.find({'reviewed': False})))


@image_route.route('/reviewed')
def reviewed():
    reviews_collection = mongo.fashionImages.db.reviews

    return dumps(list(reviews_collection.find({})))


@image_route.route('/review/<filename>', methods=(['POST']))
def reviewImage(filename):
    suggestion = request.get_json()

    reviews_collection = mongo.fashionImages.db.reviews
    annotation_collection = mongo.fashionImages.db.annotations

    annotation_collection.update_one({'file_name': filename}, {"$set": {'reviewed': True}})
    reviews_collection.insert_one({'file_name': filename, 'annotation': suggestion})

    return 'Ok'


@image_route.route('/annotateImage', methods=['POST'])
def annotate():
    image = request.files.get('image')
    dictToSend = {'image': image.read()}
    image.seek(0)

    response = requests.post(f'{mmfashionAPIAddress}/annotate',
                     files=dictToSend).json()

    name = ''.join(random.choice(string.ascii_letters) for i in range(16))+image.filename   

    fashion_image_collection = mongo.fashionImages.db.images
    result = mongo.fashionImages.save_file(name, image)
    print(result)

    annotation_collection = mongo.fashionImages.db.annotations
    annotation_collection.insert({'file_name': name, 'annotation': response, 'reviewed': False})

    return jsonify(response)
