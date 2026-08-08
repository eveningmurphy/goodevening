import mysql.connector

from database.config import DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USER, PORT # for local development 


# --- DB connection helper ---
def get_db_connection():
    return mysql.connector.connect(
        host=DATABASE_HOST,
        user=DATABASE_USER,
        password=DATABASE_PASSWORD,
        database=DATABASE
    )

def get_guestbook_entries():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM guestbook_entries ORDER BY timestamp DESC")
    entries = cursor.fetchall()
    conn.close()

    return entries
