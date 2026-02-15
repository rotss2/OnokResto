from flask import Blueprint
from __init__ import db

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return "Welcome to OnokResto!"

@views.route('/init-db')
def init_db():
    db.create_all()
    return "Database tables created!"