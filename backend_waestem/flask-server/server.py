from flask import Flask, jsonify, request
import base64
from flask_mysqldb import MySQL
from flask_cors import CORS
from MySQLdb import IntegrityError

app = Flask("Waestem")
CORS(app, resources={r"*": {"origins": "*"}})
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
        print("got the data")
        title = request.form['title']
        description = request.form['description']
        location = request.form['location']
        username = request.form['username']

        image_data = bytes(request.files['image'].read())
        user_image = request.form['user_image']
        cursor = mysql.connection.cursor()
        sql = "INSERT INTO posts (title, description, location, image, user_image, username) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (title, description, location, image_data, user_image, username))
        mysql.connection.commit()
        return 'Post created successfully!'
    elif request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute('''SELECT id, title, location, description, image, user_image, username FROM posts''')
        pins = []
        for (id, title, location, description, image, user_image, username) in cur:
            pins.append({
                'id': id,
                'title': title,
                'location': location,
                'description': description,
                'image': base64.b64encode(image).decode('utf-8'),
                'user_image': user_image,
                'username': username
            })
        return jsonify(pins)
    return "No Data"


@app.route('/userUp', methods=['GET','POST']) # Upload user data
def userUp():
    if request.method == 'POST':
        data = request.get_json()
        print("This is data ")
        print(data)
        name = data['name']
        image = data['img']
        email = data['email']
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
        username = request.args.get('username')
        cur = mysql.connection.cursor()
        if username:
            cur.execute('''SELECT * FROM travelers WHERE name = %s''', (username,))
        else:
            cur.execute('''SELECT * FROM travelers''')
        rv = cur.fetchall()
        return jsonify(rv)
    return "No Data"

@app.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    cursor = mysql.connection.cursor()
    try:
        cursor.execute("DELETE FROM posts WHERE id = %s", (post_id,))
        mysql.connection.commit()
        if cursor.rowcount:
            return "Post deleted successfully", 200
        else:
            return "Post not found", 404
    except Exception as e:
        mysql.connection.rollback()
        return str(e), 500
    finally:
        cursor.close()


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
