
from flask.blueprints import Blueprint

from flask import Blueprint, request, url_for, redirect, session, current_app, jsonify
from flask.wrappers import Response
from flask_jwt_extended.view_decorators import jwt_required
from ..db import mongo

integrations_route = Blueprint('integrations_route', __name__)


@jwt_required
@integrations_route.route('/integrations', methods=(['POST']))
def uploadProductImage():
    integrations_collection = mongo.integrations.db.integrations

    content = request.json
    integrations_collection.insert(content)

    return Response('Gathered ' + content['name'])
