from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/links')
def links():
    return render_template('links.html')

@app.route('/scrapyard')
def scrapyard():
    return render_template('scrapyard.html')

if __name__ == '__main__':
    app.run(debug=True)