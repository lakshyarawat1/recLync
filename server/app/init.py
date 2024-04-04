from flask import Flask,g, jsonify, request, Response
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
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
    salt = secrets.token_bytes(16)

    salted_password = password.encode() + salt

    hashed_password = hashlib.sha256(salted_password).hexdigest()

    return salt, hashed_password

def verify_password(hashed_password, salt, password):
    salted_password = password.encode() + salt

    new_hashed_password = hashlib.sha256(salted_password).hexdigest()

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

@app.route('/stream-data')
def stream_data():
    def generate():
        for i in (0,1,2,5,6,8,11,12,13,14,15,16,17,18,22,23,32,33,34,35,36,37,38):
            data = fetch_column_data(get_data_from_csv(), i)
            print(json.dumps(data))
    return Response(generate(), mimetype='text')


@app.route('/api/auth/register', methods=['POST'])
def register_user():
    request_data = request.get_json()
    id = request_data['id']
    firstName = request_data['firstName']
    lastName = request_data['lastName']
    email = request_data['email']
    password = request_data['password']
    preferences = ''

    db = get_db()
    cursor = db.cursor()
    cursor.execute('INSERT INTO users ( firstName, lastName, email, password, preferences) VALUES (?,?,?,?,?)', ( firstName, lastName, email, password, preferences))
    db.commit()
    return jsonify({ "data" : request_data, "success" : True, "message" : "User registered successfully"})

@app.route('/api/auth.login', methods=['POST'])
def login():
    request_data = request.get_json()

    email = request_data['email']
    password = request_data['password']

    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE email = ?', (email))
    user = cursor.fetchone()

    print(user)

    return ""
# Main Function

if __name__ == '__main__':  
        app.run(debug=True)