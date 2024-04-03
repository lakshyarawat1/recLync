from flask import Flask,g
import sqlite3


# App Initialization
app = Flask(__name__)

# Database Name
DATABASE="server/app/db.sqlite"

# Function / Actions
def get_db():

    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def init_db():
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)')
    cursor.execute('INSERT INTO users (name, email, password) VALUES ("John", "john@example.com","password")')
    connection.commit()
    connection.close()

def close_db_connection(db):
    if db is not None:
        db.close()

@app.teardown_appcontext
def teardown_db(exception):
    db = getattr(g, '_database', None)
    close_db_connection(db)



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


# Main Function

if __name__ == '__main__':
    app.run(debug=True)