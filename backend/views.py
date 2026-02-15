@views.route('/init-db')
def init_db():
    from __init__ import db
    db.create_all()
    return "Database tables created!"