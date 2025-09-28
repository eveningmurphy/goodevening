import mysql.connector

# --- DB connection helper ---
def get_db_connection():
    return mysql.connector.connect(
        host="***",
        user="***",
        password="***",
        database="wasteland"
    )

def get_guestbook_entries():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM guestbook_entries ORDER BY timestamp DESC")
    entries = cursor.fetchall()
    conn.close()

    return entries
