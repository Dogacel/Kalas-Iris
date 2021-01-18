import os

from flask import Flask, request, url_for, redirect, render_template, session
from flask import jsonify
from werkzeug.wrappers import CommonRequestDescriptorsMixin, Response
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token


def create_app(test_config=None):
    # create and configure the app
    load_dotenv()
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, support_credentials=True)
    bcrypt = Bcrypt(app)

    DATABASE_USERNAME = os.getenv("DATABASE_USERNAME")
    DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")

    app.config.from_mapping(
        SECRET_KEY='dev',
    )

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
                session['access_token'] = create_access_token(identity=username)
                session['refresh_token'] = create_access_token(identity=username)
                
                return redirect(url_for('index'))

        return Response('Username and password do not match', status=401)

    @app.route('/getSession', methods=(['GET']))
    @cross_origin(support_credentials=True)
    def getCurrentSession():
        return session

    return app
