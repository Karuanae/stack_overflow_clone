from flask import Flask, request, jsonify, Blueprint
from models import db, User
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token



auth_bp = Blueprint("auth_bp", __name__)



# 
@auth_bp.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"error": "Username and password are required to login"}), 400
     
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)     

    else:
        return jsonify({"error": "User does not exists/wrong details"}), 400

    
 
