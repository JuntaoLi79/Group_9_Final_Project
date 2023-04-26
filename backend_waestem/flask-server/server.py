from flask import Flask

app = Flask(__name__)


@app.route('/members')
# Sample member skeleton
def members():
    return {"members": ["John", "Paul", "George", "Ringo"]}

if __name__ == '__main__':
    app.run(debug=True)