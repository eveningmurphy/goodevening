import mysql.connector

# --- DB connection helper ---
def get_db_connection():
    return mysql.connector.connect(
        host="serverless-eu-central-1.sysp0000.db1.skysql.com",
        user="dbpwf26365997",
        password="*2Bldk?i2MN1J4.t3kw2ECp",
        database="wasteland",
        port=4005
    )

def get_guestbook_entries():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM guestbook_entries ORDER BY timestamp DESC")
    entries = cursor.fetchall()
    conn.close()

    return entries
