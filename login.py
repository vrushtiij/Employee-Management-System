from flask import Flask, request, jsonify,make_response
from flask_cors import CORS
import pyodbc
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, set_access_cookies

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "secret_key"
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_ACCESS_COOKIE_NAME"] = "token"
app.config["JWT_COOKIE_CSRF_PROTECT"] = False
jwt = JWTManager(app)
CORS(app)

conn = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=localhost;"
    "Database=EMS;"
    "Trusted_Connection=yes;"
)
cursor = conn.cursor()

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    uname = data["username"]
    sql = "Select * from users where username = ?"
    cursor.execute(sql,(uname,))
    res = cursor.fetchall()
    if not res:
        sql = "Insert into users(username,passw) values(?,?)"
        values = (data["username"], data["password"])
        cursor.execute(sql,values)

        conn.commit()

        return jsonify({"message": "registered successfully"}), 201
    
    else:
        return jsonify({"message": "Username already exists"})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    uname = data["username"]
    sql = "Select * from users where username = ?"
    cursor.execute(sql,(uname,))
    res = cursor.fetchone()
    if not res :
        return jsonify({"message": "username invalid"})
    else:
        passw = data["password"]
        if res[2] == passw:
            access_token = create_access_token(identity=uname)
            response = make_response("login successful")
            set_access_cookies(response, access_token)
            return response

        else:
            return jsonify({"messsage": "password invalid"})

if __name__ == "__main__":
    app.run(debug=True)

