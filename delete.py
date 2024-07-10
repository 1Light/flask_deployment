import mysql.connector

def delete_user_by_email(email):
    try:
        # MySQL Configuration
        mysql_config = {
            'host': 'localhost',
            'user': 'root',
            'password': '123',
            'database': 'myappdb',
        }

        # Initialize MySQL connection
        conn = mysql.connector.connect(**mysql_config)

        # Initialize cursor
        cur = conn.cursor()

        # Delete rows where email matches
        delete_query = "DELETE FROM users WHERE email = %s"
        cur.execute(delete_query, (email,))

        # Commit the transaction
        conn.commit()
        print(f"Deleted user with email '{email}' successfully.")

    except mysql.connector.Error as err:
        print(f"Error deleting user: {err}")

    finally:
        # Close cursor and connection
        if cur:
            cur.close()
        if conn:
            conn.close()

# Example usage
if __name__ == "__main__":
    email_to_delete = ''
    delete_user_by_email(email_to_delete)
