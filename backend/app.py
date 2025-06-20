from datetime import timedelta
from flask import Flask, request, jsonify
from models import db, TokenBlocklist
from flask_migrate import Migrate
from flask_mail import Mail
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://so_db_user:4P7hStpZ4vAFleAn7v6BOKnUgNl5RCVy@dpg-d1ag0u3ipnbc73a32j00-a.oregon-postgres.render.com/so_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)

# flask cors
CORS(app)

# mail configurations
app.config['MAIL_SERVER'] = 'smtp.gmail.com' 
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config["MAIL_USE_SSL"] = False
app.config['MAIL_USERNAME'] = 'kelvinapp2025@gmail.com'
app.config['MAIL_PASSWORD'] = 'rvkh mymz ttzx rrqb' 
app.config['MAIL_DEFAULT_SENDER'] = 'yourrmail@gmail.com'

mail = Mail(app)

# JWT
app.config["JWT_SECRET_KEY"] = "sjusefvyilgfvksbhvfiknhalvufn"  
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)

# test
app.config["JWT_VERIFY_SUB"] = False

jwt = JWTManager(app)
jwt.init_app(app)

# Register Blueprints
from views import *
app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(question_bp)
app.register_blueprint(answer_bp)
app.register_blueprint(vote_bp)

# Callback function to check if a JWT exists in the database blocklist
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None



if __name__ == "__main__":
    app.run(debug=True)




