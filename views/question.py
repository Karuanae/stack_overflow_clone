from flask import Flask, request, jsonify, Blueprint
from models import db, User, Question

question_bp = Blueprint("question_bp", __name__)

# Create a new question
@question_bp.route('/questions', methods=['POST'])
def create_question():
    data = request.get_json()

    title = data.get('title')
    body = data.get('body')
    tags = data.get('tags')
    user_id = data.get('user_id') 

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
            }
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
        }
    }), 200

# update a question - also used to approve and disapprove questions
@question_bp.route('/questions/<int:id>', methods=['PATCH'])
def update_question(id):
    question = Question.query.get(id)
    if not question:
        return jsonify({"error": "Question not found"}), 404

    data = request.get_json()
    title = data.get('title', question.title)
    body = data.get('body', question.body)
    tags = data.get('tags', question.tags)

    question.title = title
    question.body = body
    question.tags = tags
    question.is_approved = data.get('is_approved', question.is_approved)
    

    db.session.commit()
    return jsonify({"success": "Question updated successfully"}), 200


# delete a question
@question_bp.route('/questions/<int:id>', methods=['DELETE'])
def delete_question(id):
    question = Question.query.get(id)
    if not question:
        return jsonify({"message": "Question not found"}), 404

    db.session.delete(question)
    db.session.commit()
    return jsonify({"success": "Question deleted successfully"}), 200