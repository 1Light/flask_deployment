from flask import Flask, render_template, request, url_for, redirect
from flask_mysqldb import MySQL
import yaml
import os

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

app.secret_key = "12345"


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Fetch form data
        userDetails = request.form
        name = userDetails['name']
        email = userDetails['email']
        username = userDetails['username']
        password = userDetails['password']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users(name, email, username, password) VALUES(%s, %s, %s, %s)",
                    (name, email, username, password))
        mysql.connection.commit()
        cur.close()
        return "Success"
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


""" if __name__ == '__main__':
    app.run(debug=True) """
