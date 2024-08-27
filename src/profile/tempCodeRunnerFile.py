
@app.route('/login', methods=['POST'])
def login_customer():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Missing required fields'}), 400

        conn = get_database_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, email, password FROM customers WHERE email = %s", (email,))
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if user:
            user_id, user_email, hashed_password = user
            if check_password_hash(hashed_password, password):  # Use check_password_hash to verify password
                access_token = generate_token(user_id, user_email)
                return jsonify({'access_token': access_token, 'message': 'Login successful'}), 200
            else:
                return jsonify({'error': 'Invalid email or password'}), 401
        else:
            return jsonify({'error': 'Invalid email or password'}), 401
    except Exception as e:
        logging.error("Error during login: %s", e)
        return jsonify({'error': str(e)}), 500

