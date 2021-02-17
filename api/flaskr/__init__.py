from flask import Flask, session
from flask_cors import CORS
from dotenv import load_dotenv
import os


def create_app(test_config=None):
    # create and configure the app
    load_dotenv()
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, support_credentials=True)

    app.config.from_mapping(
        SECRET_KEY='dev',
        JWT_SECRET_KEY='super-secret',
        JWT_BLACKLIST_ENABLED=True,
        JWT_BLACKLIST_TOKEN_CHECKS=['access', 'refresh']
    )

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

    with app.app_context():
        from .routes.auth import auth_route
        from .routes.image import image_route
        from .routes.integrations import integrations_route        
        from .routes.woocommerce import woocommerce_route
        
    app.register_blueprint(auth_route)
    app.register_blueprint(image_route)
    app.register_blueprint(woocommerce_route)
    app.register_blueprint(integrations_route)

    @app.route('/')
    def index():
        if 'username' in session:
            return 'You are logged in as ' + session['username']

        return "Hello"

    return app
