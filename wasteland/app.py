from flask import Flask, render_template, request, redirect, url_for

from db import get_db_connection, get_guestbook_entries

app = Flask(__name__)

# --- Routes ---

@app.route('/')
def index():
    entries = get_guestbook_entries()
    return render_template('index.html', entries=entries)

@app.route('/links')
def links():
    return render_template('links.html')

@app.route('/scrapyard', methods=["GET", "POST"])
def scrapyard():
    entries = get_guestbook_entries()

    print(entries)

    return render_template("scrapyard.html", entries=entries)

@app.route('/guestbook', methods=["GET", "POST"])

def guestbook():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    if request.method == "POST":
        name = request.form["name"]
        message = request.form["message"]
        cursor.execute(
            "INSERT INTO guestbook_entries (name, message) VALUES (%s, %s)",
            (name, message)
        )
        conn.commit()
    # maybe redirect to a confirmation/sign-up option URL?
    return redirect(url_for("scrapyard"))


if __name__ == '__main__':
     app.run(debug=True)