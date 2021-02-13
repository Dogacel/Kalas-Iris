from flask import Blueprint, request, url_for, redirect, session, current_app, jsonify
from werkzeug.wrappers import Response
from flask_cors import cross_origin
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity, jwt_refresh_token_required,
    get_raw_jwt
)

from flask_bcrypt import Bcrypt
import datetime

from ..db import mongo

bcrypt = Bcrypt(current_app)
jwt = JWTManager(current_app)
blacklist = set()

auth_route = Blueprint('auth_route', __name__)


@auth_route.route('/signup', methods=(['POST']))
def signup():
    # Receive the form info
    username = request.form['username']
    password = request.form['password']
    email = request.form['email']
    name = request.form['name']
    surname = request.form['surname']

    # Get the users collection
    users = mongo.userInformation.db.users

    # Check for duplicates
    existing_user = users.find_one({'username': username})
    existing_email = users.find_one({'email': email})

    if (existing_user is None):
        if (existing_email is None):
            # encrypt the password
            pw_hash = bcrypt.generate_password_hash(
                password).decode('utf-8')
            users.insert(
                {'username': username, 'email': email, 'password': pw_hash, 'name': name, 'surname': surname})
            session['username'] = username

            return redirect(url_for('index'))
        else:
            return Response('That email already exists!', status=403)
    else:
        return Response('That username already exists!', status=403)



@auth_route.route('/login', methods=(['POST']))
def login():
    # Receive the form info
    username = request.form['username']
    password = request.form['password']
    # email = request.form['email']

    # Get the users collection
    users = mongo.userInformation.db.users

    login_user = users.find_one({'username': username})
    if login_user:
        if bcrypt.check_password_hash(login_user['password'], password):
            session['username'] = username
            expires = datetime.timedelta(hours=1)
            tokens = {
                'access_token': create_access_token(identity=username, expires_delta=False),
                'refresh_token': create_refresh_token(identity=username)
            }
            return jsonify(tokens)

    return Response('Username and password do not match', status=401)


@auth_route.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    ret = {
        'access_token': create_access_token(identity=current_user)
    }
    return Response(jsonify(ret))

# Endpoint for revoking the current users access token


@auth_route.route('/logout', methods=['DELETE'])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    return Response(jsonify({"msg": "Successfully logged out"}))


# Endpoint for revoking the current users refresh token
@auth_route.route('/logout2', methods=['DELETE'])
@jwt_refresh_token_required
def logout2():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    return Response(jsonify({"msg": "Successfully logged out"}))

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist

@auth_route.route('/getCurrentUser', methods=(['GET']))
@cross_origin(support_credentials=True)
@jwt_required
def getCurrentUser():
    current_user = get_jwt_identity()
    print(current_user)
    return jsonify(logged_in_as=current_user), 200


