from flask import Blueprint, request, url_for, redirect, session, current_app, jsonify
from flask.wrappers import Response
from ..db import mongo

image_route = Blueprint('image_route', __name__)


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
