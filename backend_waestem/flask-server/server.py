from flask import Flask, jsonify
from flask import Flask, session, abort
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask("Waestem")
CORS(app)
app.config['MYSQL_HOST'] = 'sql566.main-hosting.eu'
app.config['MYSQL_USER'] = 'u408394733_double'
app.config['MYSQL_PASSWORD'] = 'Mark321654.'
app.config['MYSQL_DB'] = 'u408394733_waestem'

mysql = MySQL(app)

def login_is_required(f):
    def decorated_function(*args, **kwargs):
        if 'google_id' not in session:
            print("You are not logged in!")
            return abort(401)
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    return "Hello world!"


@app.route('/traveler_data')
def traveler_data():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM travelers''')
    rv = cur.fetchall()
    return jsonify(rv)

@app.route('/login')
def login():
    pass
@app.route('/callback')
def callback():
    pass
@app.route('/logout')
def logout():
    pass

@app.route('/protected_area')
@login_is_required
def protected_area():
    pass


if __name__ == '__main__':
    app.run(debug=True) 