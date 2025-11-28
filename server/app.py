


# from flask import Flask
# from flask.cli import load_dotenv
# from flask_cors import CORS
# from routes.photos import photo_routes
# from routes.booking import booking_routes
# from routes.contact import contact_routes
# from routes.gallery import gallery_routes
# import os

# from routes.contact import contact_routes
# from config.email_config import init_mail
# load_dotenv()

# app = Flask(__name__)
# CORS(app)

# init_mail(app)

# # Create upload folder if it doesn't exist
# os.makedirs('uploads/images', exist_ok=True)

# # Increased limits for file uploads
# app.config['UPLOAD_FOLDER'] = 'uploads/images'
# app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB max file size

# # GitHub Configuration (CHANGE THESE!)
# app.config['GITHUB_REPO'] = ''  # Leave empty to use local storage only
# app.config['GITHUB_TOKEN'] = ''  # Not needed for local storage
# app.config['GITHUB_BRANCH'] = 'main'
# app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'uploads/images')


# # Register blueprints
# app.register_blueprint(photo_routes, url_prefix="/photos")
# app.register_blueprint(booking_routes, url_prefix="/booking")
# app.register_blueprint(contact_routes, url_prefix="/contact")
# app.register_blueprint(gallery_routes, url_prefix="/api")

# # # Debug: Print all registered routes
# # @app.before_first_request
# # def log_routes():
# #     print("\n=== REGISTERED ROUTES ===")
# #     for rule in app.url_map.iter_rules():
# #         print(f"{rule.endpoint}: {rule.rule}")
# #     print("========================\n")

# if __name__ == "__main__":
#     app.run(port=5000, debug=True)


# # from flask import Flask
# # from flask_cors import CORS
# # from dotenv import load_dotenv
# # import os

# # # Import routes
# # from routes.contact import contact_routes

# # # Import email config
# # from config.email_config import init_mail

# # load_dotenv()

# # app = Flask(__name__)
# # CORS(app)

# # # Initialize Flask-Mail
# # init_mail(app)

# # # Register blueprints
# # app.register_blueprint(contact_routes, url_prefix="/contact")

# # if __name__ == "__main__":
# #     app.run(debug=True, port=5000)


from flask import Flask
from flask.cli import load_dotenv
from flask_cors import CORS
from routes.photos import photo_routes
from routes.booking import booking_routes
from routes.contact import contact_routes
from routes.gallery import gallery_routes
import os


from config.email_config import init_mail
load_dotenv()


app = Flask(__name__, static_folder='uploads')


# Only allow your Netlify origin (more secure than '*')
CORS(app, resources={r"/api/*": {"origins": "https://blackbox-studio23.netlify.app"}})


init_mail(app)


# Create upload folder if it doesn't exist
os.makedirs(os.path.join(app.root_path, 'uploads', 'images'), exist_ok=True)


# Increased limits for file uploads
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'uploads', 'images')
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024 # 50MB max file size


# GitHub Configuration (if you later use it)
app.config['GITHUB_REPO'] = ''
app.config['GITHUB_TOKEN'] = ''
app.config['GITHUB_BRANCH'] = 'main'


# Register blueprints
app.register_blueprint(photo_routes, url_prefix="/photos")
app.register_blueprint(booking_routes, url_prefix="/booking")
app.register_blueprint(contact_routes, url_prefix="/contact")
app.register_blueprint(gallery_routes, url_prefix="/api")


if __name__ == "__main__":
port = int(os.environ.get("PORT", 5000))
app.run(host="0.0.0.0", port=port)