from flask_pymongo import PyMongo
from flask import current_app
import os

DATABASE_USERNAME = os.getenv("DATABASE_USERNAME")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")


class mongo:
    # Create the MongoDB instances
    fashionImages = PyMongo(
        current_app, uri=f'mongodb+srv://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@cluster0.ee0zf.mongodb.net/fashion_images?retryWrites=true&w=majority')
    userInformation = PyMongo(
        current_app, uri=f'mongodb+srv://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@cluster0.ee0zf.mongodb.net/user_information?retryWrites=true&w=majority')
    integrations = PyMongo(
        current_app, uri=f'mongodb+srv://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@cluster0.ee0zf.mongodb.net/integrations?retryWrites=true&w=majority')
