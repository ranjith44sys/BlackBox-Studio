# from flask import Blueprint, request, jsonify
# from models.contact_model import save_contact
# from config.email_config import send_contact_notification

# # contact_routes = Blueprint("contact_routes", __name__)

# # @contact_routes.route("/", methods=["POST"])
# # def submit_contact():
# #     data = request.json

# #     required = ["firstName", "lastName", "email", "message"]
# #     if not all(data.get(field) for field in required):
# #         return jsonify({"error": "All fields are required"}), 400

# #     inserted_id = save_contact(data)
# #     return jsonify({"message": "Message sent successfully!", "id": inserted_id}), 201




# contact_routes = Blueprint("contact_routes", __name__)

# @contact_routes.route("/", methods=["POST"])
# def submit_contact():
#     data = request.json

#     # Validate required fields
#     required = ["firstName", "lastName", "email", "message"]
#     if not all(data.get(field) for field in required):
#         return jsonify({"error": "All fields are required"}), 400

#     try:
#         # Step 1: Save to MongoDB
#         inserted_id = save_contact(data)
        
#         # Step 2: Send email notification
#         email_sent = send_contact_notification(data)
        
#         if email_sent:
#             return jsonify({
#                 "message": "Message sent successfully!",
#                 "id": inserted_id,
#                 "email_sent": True
#             }), 201
#         else:
#             # Message saved but email failed
#             return jsonify({
#                 "message": "Message saved but email notification failed",
#                 "id": inserted_id,
#                 "email_sent": False
#             }), 201
            
#     except Exception as e:
#         print(f"Error in submit_contact: {str(e)}")
#         return jsonify({"error": "Failed to process contact form"}), 500

from flask import Blueprint, request, jsonify, current_app
from flask_mail import Message


contact_routes = Blueprint('contact', __name__)


@contact_routes.route('/send', methods=['POST'])
def send_contact():
data = request.json or {}
name = data.get('name')
email = data.get('email')
message = data.get('message')


if not (name and email and message):
return jsonify({'error': 'Missing fields'}), 400


mail = current_app.extensions.get('mail')
if not mail:
return jsonify({'error': 'Mail service not configured'}), 500


msg = Message(subject=f"Contact from {name}",
sender=current_app.config.get('MAIL_DEFAULT_SENDER'),
recipients=[current_app.config.get('RECIPIENT_EMAIL')])
msg.body = f"From: {name} <{email}>\n\n{message}"


mail.send(msg)
return jsonify({'status': 'sent'})