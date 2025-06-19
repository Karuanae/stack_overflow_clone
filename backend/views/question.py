from flask import Flask, request, jsonify, Blueprint
from models import db, User, Question, Vote
from flask_jwt_extended import jwt_required, get_jwt_identity
question_bp = Blueprint("question_bp", __name__)

# Create a new question
@question_bp.route('/questions', methods=['POST'])
@jwt_required()
def create_question():
    data = request.get_json()

    title = data.get('title')
    body = data.get('body')
    tags = data.get('tags')
    user_id = get_jwt_identity()

    if not title or not body or not tags:
        return jsonify({"error": "Title, body, and tags are required"}), 400

    title_exists = Question.query.filter_by(title=title).first()
    if title_exists:
        return jsonify({"error": "A question with this title already exists"}), 400
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    new_question = Question(title=title, body=body, tags=tags, user_id=user_id)
    
    db.session.add(new_question)
    
    db.session.commit()
    return jsonify({"success": "Question created successfully"}), 201


# fetch all questions
@question_bp.route('/questions', methods=['GET'])
def get_questions():
    questions = Question.query.all()
    if not questions:
        return jsonify({"error": "No questions found"}), 404
    
    questions_list = []

    for question in questions:
        question_data = {
            "id": question.id,
            "title": question.title,
            "body": question.body,
            "tags": question.tags,
            "created_at": question.created_at,
            "is_approved": question.is_approved,
            "user": {
                "id": question.user.id,
                "username": question.user.username,
                "email": question.user.email
            },
            # fetch questions' votes
            "votes": len(Vote.query.filter_by(value=1, question_id=question.id).all()) - len(Vote.query.filter_by(value=-1, question_id=question.id).all())
        }
        questions_list.append(question_data)

    return jsonify(questions_list), 200

# Fetch a single question byid
@question_bp.route('/questions/<int:id>', methods=['GET'])
def get_question(id):
    question = Question.query.get(id)
    if not question:
        return jsonify({"error": "Question not found"}), 404

    return jsonify({
        "id": question.id,
        "title": question.title,
        "body": question.body,
        "tags": question.tags,
        "created_at": question.created_at,
        "is_approved": question.is_approved,
        "user":{
            "id": question.user.id,
            "username": question.user.username,
            "email": question.user.email
        },
        "answers":[
        {
            "id": answer.id,
            "body": answer.body,
            "created_at": answer.created_at,
            "user": {
                "id": answer.user.id,
                "username": answer.user.username,
                "email": answer.user.email
            }
        } for answer in question.answers
    ]

    }), 200

# update a question 
@question_bp.route('/questions/<int:id>', methods=['PATCH'])
@jwt_required()
def update_question(id):
    current_user_id = get_jwt_identity()

    question = Question.query.get(id)
    if not question:
        return jsonify({"error": "Question not found"}), 404

    if question.user.id != current_user_id:
        return jsonify({"error": "You are not authorized to update this question"}), 403
    
    data = request.get_json()
    title = data.get('title', question.title)
    body = data.get('body', question.body)
    tags = data.get('tags', question.tags)
    is_approved = question.is_approved

    question.title = title
    question.body = body
    question.tags = tags
    question.is_approved = is_approved



    db.session.commit()
    return jsonify({"success": "Question updated successfully"}), 200

# ROUTE FOR APPROVING A QUESTION BY ADMIN
@question_bp.route('/questions/<int:id>/approve', methods=['PATCH'])
@jwt_required()
def approve_dissapprove_question(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if not current_user.is_admin:
        return jsonify({"error": "You are not authorized to approve or disapprove questions"}), 403

    question = Question.query.get(id)
    if not question:
        return jsonify({"error": "Question not found"}), 404

    data = request.get_json()
    is_approved = data.get('is_approved', question.is_approved)

    if is_approved:
        question.is_approved = True
        db.session.commit()
        return jsonify({"success": "Question approved!"}), 200
    else:
        question.is_approved = False
        db.session.commit()
        return jsonify({"success": "Question dissapproved!"}), 200



# delete a question
@question_bp.route('/questions/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_question(id):
    current_user_id = get_jwt_identity()
    question = Question.query.get(id)
    if not question:
        return jsonify({"message": "Question not found"}), 404
    
    if question.user.id != current_user_id:
        return jsonify({"error": "You are not authorized to delete this question"}), 403

    db.session.delete(question)
    db.session.commit()
    return jsonify({"success": "Question deleted successfully"}), 200