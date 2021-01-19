import os

from flask import Flask, request, url_for, redirect, render_template, session
from flask import jsonify
from werkzeug.wrappers import CommonRequestDescriptorsMixin, Response
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_jwt_extended import ( 
    JWTManager, create_access_token, create_refresh_token, 
    jwt_required, get_jwt_identity, jwt_refresh_token_required,
    get_raw_jwt
)
import datetime

def create_app(test_config=None):
    # create and configure the app
    load_dotenv()
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, support_credentials=True)
    bcrypt = Bcrypt(app)
    jwt = JWTManager(app)

    app.config.from_mapping(
        SECRET_KEY='dev',
        JWT_SECRET_KEY = 'super-secret',
        JWT_BLACKLIST_ENABLED = True,
        JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']
    )
    blacklist = set()
    DATABASE_USERNAME = os.getenv("DATABASE_USERNAME")
    DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")

    # Create the MongoDB instances
    fashionImages_mongo = PyMongo(
        app, uri=f'mongodb+srv://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@cluster0.ee0zf.mongodb.net/fashion_images?retryWrites=true&w=majority')
    userInformation_mongo = PyMongo(
        app, uri=f'mongodb+srv://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@cluster0.ee0zf.mongodb.net/user_information?retryWrites=true&w=majority')

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/')
    def index():
        if 'username' in session:
            return 'You are logged in as ' + session['username']

        return "Hello"

    @app.route('/uploadProductImage', methods=(['POST']))
    def uploadProductImage():
        file = request.files.get('image')
        fashion_image_collection = fashionImages_mongo.db.images
        fashionImages_mongo.save_file(file.filename, file)
        fashion_image_collection.insert({'photo_name': file.filename})
        # Return more meaningful data maybe

        return 'Done!'

    @app.route('/file/<filename>')
    def file(filename):
        return fashionImages_mongo.send_file(filename)

    @app.route('/signup', methods=(['POST']))
    @cross_origin(support_credentials=True)
    def signup():
        # Receive the form info
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        name = request.form['name']
        surname = request.form['surname']

        # Get the users collection
        users = userInformation_mongo.db.users

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

    @app.route('/login', methods=(['POST']))
    @cross_origin(support_credentials=True)
    def login():
        # Receive the form info
        username = request.form['username']
        password = request.form['password']
        # email = request.form['email']

        # Get the users collection
        users = userInformation_mongo.db.users

        login_user = users.find_one({'username': username})
        if login_user:
            if bcrypt.check_password_hash(login_user['password'], password):
                session['username'] = username
                expires = datetime.timedelta(hours=1)
                tokens = { 
                    'access_token': create_access_token(identity=username, expires_delta=expires),
                    'refresh_token': create_refresh_token(identity=username) 
                }
                return jsonify(tokens), 200

        return Response('Username and password do not match', status=401)

    @app.route('/refresh', methods=['POST'])
    @jwt_refresh_token_required
    def refresh():
        current_user = get_jwt_identity()
        ret = {
            'access_token': create_access_token(identity=current_user)
        }
        return jsonify(ret), 200

    # Endpoint for revoking the current users access token
    @app.route('/logout', methods=['DELETE'])
    @jwt_required
    def logout():
        jti = get_raw_jwt()['jti']
        blacklist.add(jti)
        return jsonify({"msg": "Successfully logged out"}), 200


    # Endpoint for revoking the current users refresh token
    @app.route('/logout2', methods=['DELETE'])
    @jwt_refresh_token_required
    def logout2():
        jti = get_raw_jwt()['jti']
        blacklist.add(jti)
        return jsonify({"msg": "Successfully logged out"}), 200

    @app.route('/getCurrentUser', methods=(['GET']))
    @cross_origin(support_credentials=True)
    @jwt_required
    def getCurrentUser():
        current_user = get_jwt_identity()
        print(current_user)
        return jsonify(logged_in_as=current_user), 200

    @jwt.token_in_blacklist_loader
    def check_if_token_in_blacklist(decrypted_token):
        jti = decrypted_token['jti']
        return jti in blacklist

    return app
