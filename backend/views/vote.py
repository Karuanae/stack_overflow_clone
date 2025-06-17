from flask import Flask, request, jsonify, Blueprint
from models import db, User, Question, Answer, Vote
from flask_jwt_extended import jwt_required, get_jwt_identity

vote_bp = Blueprint("vote_bp", __name__)


# QUESTION VOTE
# Create a new vote
@vote_bp.route('/question/vote', methods=['POST'])
@jwt_required()
def create_question_vote():
    data = request.get_json()

    user_id = get_jwt_identity()
    question_id = data.get('question_id')
    value = data.get('value')

    if not user_id or not question_id or value is None:
        return jsonify({"error": "User ID, question ID, and value are required"}), 400

    user_exists = User.query.get(user_id)
    if not user_exists:
        return jsonify({"error": "User not found"}), 404

    question_exists = Question.query.get(question_id)
    if not question_exists:
        return jsonify({"error": "Question not found"}), 404    

    # Check if the user has already voted on this question
    existing_vote = Vote.query.filter_by(user_id=user_id, question_id=question_id).first()
    if existing_vote:
        existing_vote.value = value
        db.session.commit()
        return jsonify({"success": "Vote updated!"}), 200
    else:
        new_vote = Vote(user_id=user_id, question_id=question_id, value=value)
        db.session.add(new_vote)
        db.session.commit()
        return jsonify({"success": "Vote saved!"}), 201
    
@vote_bp.route('/question/<question_id>/votes', methods=['GET'])
def get_votes_for_question(question_id):   
    votes = Vote.query.filter_by(question_id=question_id).all()
    # -1 -1 -1 1 1 1 1 1
    # count the number of upvotes and downvotes
    downvotes = []
    upvotes = []
    for vote in votes:
        if vote.value == 1:
            upvotes.append(vote)
        elif vote.value == -1:
            downvotes.append(vote)

    return jsonify({"votes": len(upvotes)-len(downvotes)}), 200

    



# ANSWER VOTE
# Create a new vote for answer
@vote_bp.route('/answer/vote', methods=['POST'])
@jwt_required()
def create_answer_vote():
    data = request.get_json()

    user_id = get_jwt_identity()
    answer_id = data.get('answer_id')
    value = data.get('value')

    if not user_id or not answer_id or value is None:
        return jsonify({"error": "User ID, answer ID, and value are required"}), 400

    user_exists = User.query.get(user_id)
    if not user_exists:
        return jsonify({"error": "User not found"}), 404

    answer_exists = Question.query.get(answer_id)
    if not answer_exists:
        return jsonify({"error": "Answer not found"}), 404    

    # Check if the user has already voted on this answer
    existing_vote = Vote.query.filter_by(user_id=user_id, answer_id=answer_id).first()
    if existing_vote:
        existing_vote.value = value
        db.session.commit()
        return jsonify({"success": "Answer updated!"}), 200
    else:
        new_vote = Vote(user_id=user_id, answer_id=answer_id, value=value)
        db.session.add(new_vote)
        db.session.commit()
        return jsonify({"success": "Answer saved!"}), 201
    


#fetch votes for answers     
@vote_bp.route('/answer/<answer_id>/votes', methods=['GET'])
def get_votes_for_answer(answer_id):   
    votes = Vote.query.filter_by(answer_id=answer_id).all()
    # -1 -1 -1 1 1 1 1 1
    # count the number of upvotes and downvotes
    downvotes = []
    upvotes = []
    for vote in votes:
        if vote.value == 1:
            upvotes.append(vote)
        elif vote.value == -1:
            downvotes.append(vote)

    return jsonify({"votes": len(upvotes)-len(downvotes)}), 200

    

