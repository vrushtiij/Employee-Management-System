from flask import Flask, request, jsonify,make_response
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, set_access_cookies, verify_jwt_in_request

load_dotenv()
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "secret_key"
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_ACCESS_COOKIE_NAME"] = "token"
app.config["JWT_COOKIE_CSRF_PROTECT"] = False
app.config["JWT_COOKIE_SECURE"] = True
app.config["JWT_COOKIE_SAMESITE"] = "None"

jwt = JWTManager(app)
CORS(
    app,
    supports_credentials=True,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:5173",
                "https://employee-management-system-eight-gray.vercel.app"
            ]
        }
    }
)

conn = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    port=53969
)

cursor = conn.cursor(dictionary=True)

EXEMPT_ROUTES = {
    "login",
    "register",
    "check_auth",
    "add_employee",
    "update_employee",
    "view_all_employee",
    "delete_employee",
    "addWork",
    "retrieve_id"
}

@app.before_request
def check_authentication():
    if request.method == "OPTIONS":
        return 
    if request.endpoint in EXEMPT_ROUTES:
        return
    else:
        verify_jwt_in_request()

@app.route("/check-auth", methods=["GET"])
@jwt_required()
def check_auth():
    user = get_jwt_identity()
    return jsonify({
        "authenticated" : True,
        "user": user
    }), 200

@app.route("/get_image", methods=["GET"])
def retrieve_image():
    sql = "Select image_url from employee where e_name=%s"
    cursor.execute(sql,("ABC",))
    res = cursor.fetchone()
    image_url = res["image_url"] 
    print(f"[{image_url}]")  
    return jsonify({"image_url": image_url})

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    uname = data["username"]
    sql = "Select * from users where username = %s"
    cursor.execute(sql,(uname,))
    res = cursor.fetchall()
    if not res:
        sql = "Insert into users(username,passw) values(%s,%s)"
        values = (data["username"], data["password"])
        cursor.execute(sql,values)

        conn.commit()

        return jsonify(
            {   "success": True,
                "message": "registered successfully"}), 201
    
    else:
        return jsonify({"message": "Username already exists"})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    uname = data["username"]
    sql = "Select * from users where username = %s"
    cursor.execute(sql,(uname,))
    res = cursor.fetchone()
    if not res :
        return jsonify({
            "success": False,
            "message": "username invalid"})
    else:
        passw = data["password"]
        if res["passw"] == passw:
            access_token = create_access_token(identity=uname)
            response = jsonify({
                "success": True,
                "message": "Login Successful"
            })
            set_access_cookies(response, access_token)
            return response, 200

        else:
            return jsonify({"messsage": "password invalid"})    

@app.route("/add", methods=["POST"])
def add_employee(): 
    data = request.json
    email = data["email"]
    sql = "Select * from employee where email=%s"
    cursor.execute(sql,(email,))
    res = cursor.fetchall()
    if not res:
        sql = "Insert into employee (e_name,email,phone,job_title,address,image_url) values(%s, %s, %s, %s, %s,%s)"
        values = (data["e_name"], data["email"], data["phone"], data["job_title"], data["address"], data["image_url"])
        cursor.execute(sql, values)
        print("employee added")
        conn.commit()
        return jsonify({"message": "employee added"}), 201

    else:
        return jsonify({"message": "Employee already exists"})

@app.route("/addWork", methods=["POST"])
def addWork():
    data = request.json
    emp_id = data["emp_id"]
    sql = "Select * from employee where employee_id=%s"
    cursor.execute(sql,(emp_id,))
    res = cursor.fetchall()
    if res:
        sql = "Insert into emp_details (emp_id,dept,designation,salary,experience,education) values(%s,%s, %s, %s, %s, %s)"
        values = (data["emp_id"], data["dept"], data["desg"], data["salary"], data["experience"], data["education"])
        cursor.execute(sql, values)
        print("employee added")
        conn.commit()
        return jsonify({"message": "employee details added"}), 201

    else:
        return jsonify({"message": "Employee doesn't exist"})

@app.route("/viewWork/<int:employee_id>", methods=["GET"])
def viewWork(employee_id):
    sql = "Select * from emp_details where emp_id=%s"
    cursor.execute(sql,(employee_id,))
    res = cursor.fetchall()

    return jsonify(res)

@app.route("/retrieve_id", methods=["GET"])
def retrieve_id():
    sql = "Select employee_id from employee"
    cursor.execute(sql)
    columns = [column[0] for column in cursor.description]
    res = cursor.fetchall()

    return jsonify(res)

@app.route("/update/<int:employee_id>", methods=["PUT"])
def update_employee(employee_id):
    data = request.json
    sql = "Update employee set e_name=%s, email=%s, phone=%s, job_title=%s, address=%s, image_url=%s where employee_id=%s"
    values = (
        data["e_name"],
        data["email"],
        data["phone"],
        data["job_title"],
        data["address"],
        data["image_url"],
        employee_id
    )
    cursor.execute(sql,values)
    conn.commit()

    return jsonify({"message": "employee updated"}), 200

@app.route("/view/<int:employee_id>", methods=["GET"])
def view_employee(employee_id):
    sql = "Select * from employee where employee_id=%s"
    values = (employee_id,)
    cursor.execute(sql,values)
    res = cursor.fetchall()

    return jsonify(res)

@app.route("/view", methods=["GET"])
def view_all_employee():
        sql = "Select * from employee"
        cursor.execute(sql)
        res = cursor.fetchall()
        return jsonify(res)

@app.route("/delete/<int:employee_id>", methods=["DELETE"])
def delete_employee(employee_id):
    cursor.execute("DELETE FROM emp_details WHERE emp_id=%s", (employee_id,))
    sql = "Delete from employee where employee_id=%s"
    cursor.execute(sql, (employee_id,))
    conn.commit()

    return jsonify({"message": "employee deleted"}), 200

