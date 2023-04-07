from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime 
from flask_mysqldb import MySQL
from flask_cors import CORS
from MySQLdb import IntegrityError

app = Flask("Waestem")
CORS(app)
app.config['MYSQL_HOST'] = 'sql566.main-hosting.eu'
app.config['MYSQL_USER'] = 'u408394733_double'
app.config['MYSQL_PASSWORD'] = 'Mark321654.'
app.config['MYSQL_DB'] = 'u408394733_waestem'

mysql = MySQL(app)

@app.route('/')
def index():
    return "Hello world!"

@app.route('/posts', methods=['GET','POST']) # Upload post data
def posts():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        name = data['e'][0]
        image = data['e'][1]
        email = data['e'][2]
        cur = mysql.connection.cursor()
        try:
            cur.execute("INSERT INTO travelers (name, img,email) VALUES (%s, %s, %s)", (name, image, email))
            mysql.connection.commit()
            return "Upload Success"
        except IntegrityError:
            mysql.connection.rollback()
            return "Duplicate entry found"
        except Exception as e:
            mysql.connection.rollback()
            return str(e)
        finally:
            cur.close()
    elif request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM travelers''')
        rv = cur.fetchall()
        return jsonify(rv)
    return "No Data"


@app.route('/userUp', methods=['GET','POST']) # Upload user data
def userUp():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        name = data['e'][0]
        image = data['e'][1]
        email = data['e'][2]
        cur = mysql.connection.cursor()
        try:
            cur.execute("INSERT INTO travelers (name, img,email) VALUES (%s, %s, %s)", (name, image, email))
            mysql.connection.commit()
            return "Upload Success"
        except IntegrityError:
            mysql.connection.rollback()
            return "Duplicate entry found"
        except Exception as e:
            mysql.connection.rollback()
            return str(e)
        finally:
            cur.close()
    elif request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM travelers''')
        rv = cur.fetchall()
        return jsonify(rv)
    return "No Data"


if __name__ == '__main__':
    app.run(debug=True) 