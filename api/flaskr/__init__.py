import os

from flask import Flask, request
from flask import jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv


def create_app(test_config=None):
    # create and configure the app
    load_dotenv()
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    DATABASE_USERNAME = os.getenv("DATABASE_USERNAME")
    DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
    
    app.config.from_mapping(
        SECRET_KEY='dev',
        MONGO_URI=f'mongodb+srv://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@cluster0.ee0zf.mongodb.net/fashion_images?retryWrites=true&w=majority'
    )

    mongo = PyMongo(app)

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

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    @app.route('/uploadProductImage', methods=(['POST']))
    def uploadProductImage():
        file = request.files.get('image')
        fashion_image_collection = mongo.db.images    
        mongo.save_file(file.filename, file)
        fashion_image_collection.insert({'photo_name': file.filename})    
        # Return more meaningful data maybe
        
        return 'Done!'

    @app.route('/file/<filename>')
    def file(filename):
        return mongo.send_file(filename)
    
    return app
