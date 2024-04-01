from flask import Flask
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app, origins='http://localhost:5173')

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/test')

def test():
    response_body='Something'

    return response_body

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)