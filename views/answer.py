from models import db, User, Answer,Question
from flask import Blueprint, request, jsonify

answer_bp = Blueprint("answer_bp", __name__)

# Create a new answer
@answer_bp.route('/answers', methods=['POST'])
def create_answer():
    data = request.get_json()

    body = data.get('body')
    user_id = data.get('user_id')
    question_id = data.get('question_id')

    if not body or not user_id or not question_id:
        return jsonify({"error": "Body, user_id, and question_id are required"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "Question not found"}), 404
    
    new_answer = Answer(body=body, user_id=user_id, question_id=question_id)

    db.session.add(new_answer)
    db.session.commit()
    
    return jsonify({"success": "Answer created successfully"}), 201


# Fetch all answers for a question
@answer_bp.route('/question/<int:question_id>/answers', methods=['GET'])
def get_answers_for_question(question_id):
    answers = Answer.query.filter_by(question_id=question_id).all()
    
    if not answers:
        return jsonify({"message": "No answers found for this question"}), 404

    return jsonify([{
        "id": answer.id,
        "body": answer.body,
        "created_at": answer.created_at,
        "is_hidden": answer.is_hidden,
        "question_id": answer.question_id,
        "user": {
            "id": answer.user.id,
            "username": answer.user.username,
            "email": answer.user.email
        },
    } for answer in answers]), 200


# update an answer
@answer_bp.route('/answers/<int:id>', methods=['PATCH'])
def update_answer(id):
    answer = Answer.query.get(id)
    
    if not answer:
        return jsonify({"message": "Answer not found"}), 404

    data = request.get_json()
    body = data.get('body', answer.body)

    answer.body = body
    db.session.commit()

    return jsonify({"success": "Answer updated successfully"}), 200


# Delete an answer
@answer_bp.route('/answers/<int:id>', methods=['DELETE'])
def delete_answer(id):
    answer = Answer.query.get(id)
    
    if not answer:
        return jsonify({"message": "Answer not found"}), 404

    db.session.delete(answer)
    db.session.commit()

    return jsonify({"success": "Answer deleted successfully"}), 200



