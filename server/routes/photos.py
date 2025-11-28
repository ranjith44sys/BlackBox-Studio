# from flask import Blueprint, request, jsonify
# from database.mongo_connection import db

# photo_routes = Blueprint("photo_routes", __name__)

# @photo_routes.route("/upload", methods=["POST"])
# def upload_photo():
#     data = request.json
#     db.photos.insert_one(data)
#     return jsonify({"message": "Photo uploaded successfully"})


from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}


photo_routes = Blueprint('photos', __name__)




def allowed_file(filename):
return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS




@photo_routes.route('/upload', methods=['POST'])
def upload_photo():
if 'file' not in request.files:
return jsonify({'error': 'No file part'}), 400
file = request.files['file']
if file.filename == '':
return jsonify({'error': 'No selected file'}), 400
if file and allowed_file(file.filename):
filename = secure_filename(file.filename)
save_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
file.save(save_path)
# Optionally return the public URL
base = (current_app.config.get('BASE_URL') or '')
url = f"{base}/uploads/images/{filename}"
return jsonify({'message': 'Uploaded', 'url': url}), 201
return jsonify({'error': 'File type not allowed'}), 400