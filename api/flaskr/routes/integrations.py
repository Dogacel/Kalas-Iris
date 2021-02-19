from flask.blueprints import Blueprint

from flask import Blueprint, request, jsonify
from flask.wrappers import Response
from flask_jwt_extended.utils import get_jwt_identity
from flask_jwt_extended.view_decorators import jwt_required
from ..db import mongo
from bson.json_util import dumps
import os

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


@integrations_route.route('/integrations/<id>/webhooks/product/created', methods=(['GET']))
@jwt_required
def getWebhookProductCreatedURL(id):
    base_url = os.getenv('BASE_URL')
    # TODO: Redirect to correct api based on integration type?
    # (Eg. /wix/${id}/.../ or /woo/${id} based on integration type on the document)
    return jsonify({'url': f"${base_url}/integrations/${id}/product/created"})
