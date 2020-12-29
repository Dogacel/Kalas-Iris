import os

from flask import Flask, request, url_for, redirect, render_template, session
from flask import jsonify
from werkzeug.wrappers import CommonRequestDescriptorsMixin
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt

def create_app(test_config=None):
    # create and configure the app
    load_dotenv()
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    bcrypt = Bcrypt(app)

    DATABASE_USERNAME = os.getenv("DATABASE_USERNAME")
    DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
    
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    # Create the MongoDB instances
    fashionImages_mongo = PyMongo(app, uri=f'mongodb+srv://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@cluster0.ee0zf.mongodb.net/fashion_images?retryWrites=true&w=majority')
    userInformation_mongo = PyMongo(app, uri=f'mongodb+srv://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@cluster0.ee0zf.mongodb.net/user_information?retryWrites=true&w=majority')

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
                
        return render_template('index.html')

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
    
    @app.route('/signup', methods=(['POST', 'GET']))
    def signup():
        if request.method == 'POST':
            # Receive the form info
            username = request.form['username']
            password = request.form['password']
            email = request.form['email']

            # Get the users collection
            users = userInformation_mongo.db.users

            # Check for duplicates
            existing_user = users.find_one({'username': username})
            existing_email = users.find_one({'email': email})

            if (existing_user is None):
                if (existing_email is None):
                    # encrypt the password
                    pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
                    users.insert({'username': username, 'email': email, 'password': pw_hash})
                    session['username'] = username
                    
                    #return redirect(url_for('index'))
                    return 'Redirect to index'
                else:
                    return 'That email already exists!'
            else:
                return 'That username already exists!'
        
        return render_template('register.html')

    @app.route('/login', methods=(['POST']))
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

                #return redirect(url_for('index'))

        return 'Username and password do not match'

    return app
