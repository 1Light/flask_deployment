from flask import Flask, render_template, request, url_for, redirect, flash
from flask_mysqldb import MySQL
import yaml
import os
import re

app = Flask(__name__)

# Get the absolute path to db.yaml
base_dir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(base_dir, 'db.yaml')

# Load the YAML file
with open(db_path) as f:
    db = yaml.safe_load(f)

# Configure db
""" db = yaml.load(open('db.yaml')) """
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)

def validate_input(name, email, username, password, confirm_password):
    # Check if any field is empty
    if not all([name, email, username, password, confirm_password]):
        flash("All fields are required")
        return False
    
    # Validate name: no numbers allowed
    if not re.match(r'^[A-Za-z\s]+$', name):
        flash("Name must contain only letters")
        return False
    
    # Validate email
    if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
        flash("Invalid email format")
        return False
    
    # Validate username: must contain letters, can have numbers, but not entirely numbers and no special characters
    if not re.match(r'^(?=.*[A-Za-z])[A-Za-z\d]+$', username):
        flash("Username must contain letters and can have numbers, but no special characters")
        return False
    
    # Validate password: must be at least 5 characters
    if len(password) < 5:
        flash("Password must be at least 5 characters long")
        return False
    
    # Validate confirm password: must match the password
    if password != confirm_password:
        flash("Passwords do not match")
        return False
    
    return True


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Fetch form data
        userDetails = request.form
        name = userDetails['name']
        email = userDetails['email']
        username = userDetails['username']
        password = userDetails['password']
        confirm_password = userDetails['confirm_password']

        if validate_input(name, email, username, password, confirm_password):
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO users(name, email, username, password) VALUES(%s, %s, %s, %s)",
                        (name, email, username, password))
            mysql.connection.commit()
            cur.close()
            return redirect("https://zealous-timer.netlify.app/")
        
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        cur = mysql.connection.cursor()
        cur.execute(
            'SELECT * FROM users WHERE email=%s AND password=%s', (email, password))
        record = cur.fetchone()
        cur.close()

        if record:
            return redirect("https://zealous-timer.netlify.app/")
        else:
            return "Errrrror"
    return render_template('login.html')


@app.route('/home', methods=['GET', 'POST'])
def home():
    return render_template('home.html')


if __name__ == '__main__':
    app.run(debug=True)
