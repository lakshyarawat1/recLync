from flask import Flask,g, jsonify, request, Response
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, create_refresh_token, get_jwt_identity
from flask_caching import Cache
import csv
import json
import sqlite3
import hashlib
import secrets


# App Initialization
app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})
CORS(app, resources={r"/*" : {"origins": "http://localhost:8080"}}, supports_credentials=True)
app.config['JWT_SECRET_KEY']= 'random_secret_key_123erqq'
jwt = JWTManager(app)


# Constants
 
DATABASE="db.sqlite"
SALT="secret-salt-will-be-secret-when-in-production"

# Function / Actions
def get_db():

    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def init_db():
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT, email TEXT, password TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, preferences TEXT)')
    connection.commit()
    connection.close()

def close_db_connection(db):
    if db is not None:
        db.close()

@app.teardown_appcontext
def teardown_db(exception):
    db = getattr(g, '_database', None)
    close_db_connection(db)

def get_data_from_csv():
    with open('games.csv', 'r', encoding='utf-8') as f:
        reader = csv.reader(f)

        data=[]
        
        for i, row in enumerate(reader):
            if i >=10 :
                break
            data.append(row)
    return data

def fetch_column_data(list, index):
    data=[]
    for row in list:
        if index < len(row):
            data.append(row[index])
    return data

def hash_password(password):

    hashed_password = hashlib.sha256((password + SALT).encode('utf-8')).hexdigest()

    return hashed_password

def verify_password (password, hashed_password):

    new_hashed_password = hashlib.sha256((password+SALT).encode('utf-8')).hexdigest()

    return new_hashed_password == hashed_password

# DB Initialized
init_db()

# Routes
@app.route('/')
def index():
    return "Hello world !"

@app.route('/query')
def query(): 
    db=get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users')
    results = cursor.fetchall()
    return str(results)

@app.route('/api/games')
@cache.cached(timeout=50)
@jwt_required()
def stream_data():
    data = get_data_from_csv()
    return jsonify({ "data" : data, "success" : True, "message" : "Data fetched successfully"})


@app.route('/api/auth/register', methods=['POST'])
def register_user():
    request_data = request.get_json()
    id = request_data['id']
    firstName = request_data['firstName']
    lastName = request_data['lastName']
    email = request_data['email']
    password = request_data['password']
    preferences = ''

    hashed_password = hash_password(password)

    db = get_db()
    cursor = db.cursor()
    cursor.execute('INSERT INTO users ( firstName, lastName, email, password, preferences) VALUES (?,?,?,?,?)', ( firstName, lastName, email, hashed_password, preferences))
    db.commit()
    return jsonify({ "data" : request_data, "success" : True, "message" : "User registered successfully"})

@app.route('/api/auth/login', methods=['POST'])
def login_user():
    request_data = request.get_json()

    email = request_data['email']
    password = request_data['password']

    # print(email, password)

    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()
    print(user)

    user_password = user[4]
    auth = verify_password(password, user_password);

    if auth:
        access_token = create_access_token(identity = {'id': user[0], 'email': user[3]})
        refresh_token = create_refresh_token(user[0])
        return jsonify({ "token" : access_token, "refresh_token" : refresh_token, "success" : True, "message" : "User logged in successfully"})
    else:
        return jsonify({ "data" : {}, "success" : False, "message" : "Invalid email or password"})

@app.route('/api/auth/verify-token', methods=['POST'])
@jwt_required()
def verify():
    return jsonify({ "success" : True, "message" : "Token is valid"})

# @app.route('/refresh')
# class TokenRefresh():
#     @jwt_required(refresh=True)
#     def post(self):
#         current_user = get_jwt_identity()
#         new_token = create_access_token(identity=current_user, fresh=False)

#         return {'access_token' : new_token}, 200

# Main Function

if __name__ == '__main__':  
        app.run(debug=True)