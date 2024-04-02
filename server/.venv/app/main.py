from flask import g,Flask, jsonify, current_app
from flask_cors import CORS
import db

app = Flask(__name__)



CORS(app, origins='http://localhost:5173')

db.init_app(app)

@app.route('/')
def index():
   return 'testing'

@app.route('/api/auth/signUp')
def signUp():
    return 'signUp'


# @app.route('/test', method=['GET'])
# def get_users():
#     users = User.objects()
#     return jsonify(users), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)