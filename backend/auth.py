from flask import Blueprint, render_template, request, redirect, url_for, flash
from models import User
from flask_login import login_user

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        if user and user.password == password:
            login_user(user)
            return redirect(url_for('views.home'))
        flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html')