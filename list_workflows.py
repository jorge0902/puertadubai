
import sqlite3

db_path = "n8n_database.sqlite"
try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, active FROM workflow_entity")
    rows = cursor.fetchall()
    print(f"Found {len(rows)} workflows:")
    for row in rows:
        print(f"ID: {row[0]} | Name: {row[1]} | Active: {row[2]}")
    conn.close()
except Exception as e:
    print(f"Error: {e}")
