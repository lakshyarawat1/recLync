from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)

client = MongoClient('mongodb+srv://lakshyarawat1:lakshyarawat1@reclync.lxdzy0g.mongodb.net/?retryWrites=true&w=majority&appName=recLync' , serverSelectionTimeoutMS=5000)

db = client['recLync']

print(client.list_database_names() , 'connected')

CORS(app, origins='http://localhost:5173')


@app.route('/')
def index():
   return ''

@app.route('/api/auth/signUp')
def signUp():
    return 'signUp'


# @app.route('/test', method=['GET'])
# def get_users():
#     users = User.objects()
#     return jsonify(users), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)