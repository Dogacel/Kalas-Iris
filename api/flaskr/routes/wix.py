from flask import Blueprint, json, request, url_for, redirect, session, current_app, jsonify
from flask.wrappers import Response
from ..db import mongo
import os
import requests
from requests_oauthlib import OAuth2Session

wix_route = Blueprint('wix_route', __name__)

# TODO: Add authentication and user permission


@wix_route.route("/<id>/oauth", methods=['POST'])
def setCredentials(id):

    payload = request.json

    client_id = payload['appid']
    client_secret = payload['secret']

    integrations_collection = mongo.integrations.db.integrations

    integrations_collection.find_one_and_update(
        {'id': id}, {client_id, client_secret})

    return jsonify("Ok")


def annotateProduct(id, annotation):
    integrations_collection = mongo.integrations.db.integrations

    integration = integrations_collection.find_one({id: id})

    app = OAuth2Session(integration.client_id, state=session['oauth_state'])
    token = app.fetch_token('https://www.wix.com/oauth/access',
                            client_secret=integration.client_secret,
                            authorization_response=request.url)

    # app.post(update product URL with correct parameters)
