from flask.blueprints import Blueprint

from flask import Blueprint, json, request, url_for, redirect, session, current_app, jsonify
from flask.wrappers import Response
from flask_jwt_extended.utils import get_jwt_identity
from flask_jwt_extended.view_decorators import jwt_required, verify_jwt_refresh_token_in_request
from flask_pymongo import PyMongo
from ..db import mongo
from bson.json_util import dumps

integrations_route = Blueprint('integrations_route', __name__)


@integrations_route.route('/integrations', methods=(['POST']))
@jwt_required
def createIntegration():
    integrations_collection = mongo.integrations.db.integrations

    content = request.json
    user = get_jwt_identity()

    content['user'] = user
    integrations_collection.insert(content)

    return Response('Gathered ' + content['name'])


@integrations_route.route('/integrations', methods=(['GET']))
@jwt_required
def getIntegrations():
    integrations_collection = mongo.integrations.db.integrations

    user = get_jwt_identity()

    integrations = integrations_collection.find({'user': user})

    return jsonify(dumps(integrations))
