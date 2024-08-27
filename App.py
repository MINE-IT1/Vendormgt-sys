import logging
import os    
import json
from flask import send_file
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_jwt_extended import JWTManager, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash  # Import check_password_hash
import mysql.connector
from mysql.connector import errorcode
from datetime import timedelta
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)

# Configure your upload folder and allowed extensions
app.config['UPLOAD_FOLDER'] = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
# UPLOAD_FOLDER = 'uploads'
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

jwt = JWTManager(app)
CORS(app)  # Enable Cross-Origin Resource Sharing for all routes
# Configure logging
logging.basicConfig(level=logging.INFO)

# Configure your JWT settings
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Change this to a strong secret key
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Initialize the JWTManager with this app
jwt = JWTManager(app)

# Configuration for MySQL database
db_config = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'aecearthwebapp1'
}
# Function to establish a database connection
def get_database_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except mysql.connector.Error as err:
        logging.error("Database connection error: %s", err)
        raise

# Function to generate a JWT token
def generate_token(customer_id, email):
    access_token = create_access_token(identity={'id': customer_id, 'email': email})
    return access_token

#Signup Api
@app.route('/customers', methods=['POST'])
def create_customer():
    try:
        data = request.json
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')

        if not first_name or not last_name or not email or not password:
            return jsonify({'error': 'Missing required fields'}), 400

        # Check if the email already exists
        conn = get_database_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM customers WHERE email = %s", (email,))
        if cursor.fetchone()[0] > 0:
            cursor.close()
            conn.close()
            return jsonify({'error': 'Email address already exists'}), 409  # HTTP status code 409 for conflict

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        cursor.execute("""
            INSERT INTO customers (first_name, last_name, email, password)
            VALUES (%s, %s, %s, %s)
        """, (first_name, last_name, email, hashed_password))
        conn.commit()

        new_customer_id = cursor.lastrowid

        # Generate access token after customer creation
        access_token = generate_token(new_customer_id, email)

        cursor.close()
        conn.close()

        return jsonify({'id': new_customer_id, 'access_token': access_token, 'message': 'Customer created successfully'}), 201
    except Exception as e:
        logging.error("Error creating customer: %s", e)
        return jsonify({'error': str(e)}), 500
    
@app.route('/customers/<int:customer_id>/details', methods=['PUT'])
def update_customer_details(customer_id):
    try:
        data = request.json
        address = data.get('address')
        phone_number = data.get('phone_number')

        if not address:
            return jsonify({'error': 'Missing address field'}), 400
        if not phone_number:
            return jsonify({'error': 'Missing phone number field'}), 400

        conn = get_database_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE customers
            SET address = %s, phone_number = %s
            WHERE id = %s
        """, (address, phone_number, customer_id))
        conn.commit()

        if cursor.rowcount == 0:
            cursor.close()
            conn.close()
            return jsonify({'error': 'Customer not found'}), 404

        cursor.close()
        conn.close()

        return jsonify({'message': 'Customer details updated successfully'}), 200
    except Exception as e:
        logging.error("Error updating customer details: %s", e)
        return jsonify({'error': str(e)}), 500

#API user for customer login
# Initialize JWTManager
jwt = JWTManager(app)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Function to establish a database connection
def get_database_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except mysql.connector.Error as err:
        logging.error("Database connection error: %s", err)
        raise

# Function to establish a database connection
def get_database_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except mysql.connector.Error as err:
        logging.error("Database connection error: %s", err)
        raise

# Function to generate a JWT token
def generate_token(customer_id, email):
    access_token = create_access_token(identity={'customer_id': customer_id, 'email': email})
    return access_token

# Login Api
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

#Payment Methods Api
@app.route('/api/v1/payments/<int:user_id>', methods=['POST'])
def process_payment(user_id):
    try:
        # Establish database connection
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Step 1: Payment Method Selection
        payment_method = request.json.get('payment_method')

        # Step 2: Get Payment Details from Request
    
        order_id = request.json.get('order_id')
        card_number = request.json.get('card_number')
        name_on_card = request.json.get('name_on_card')
        expiry_date = request.json.get('expiry_date')
        cvv = request.json.get('cvv')

        # Validate required fields
        if not order_id or not payment_method or not card_number or not name_on_card or not expiry_date or not cvv:
            return jsonify({'error': 'Missing payment details'}), 400

        # Check if the order exists and belongs to the user
        cursor.execute("SELECT * FROM orders WHERE user_id = %s AND order_id = %s", (user_id, order_id))
        order = cursor.fetchone()
        if not order:
            cursor.close()
            conn.close()
            return jsonify({'error': 'Order not found or does not belong to the user'}), 404

        # Check if the order has already been paid
        if order[5] == 'paid':  # Assuming 6th column is payment_status
            cursor.close()
            conn.close()
            return jsonify({'error': 'Payment for this order has already been processed'}), 400

        # Generate invoice ID
        cursor.execute("SELECT MAX(invoice_id) FROM orders")
        last_invoice_id = cursor.fetchone()[0]
        if last_invoice_id is None:
            invoice_id = 1001
        else:
            invoice_id = last_invoice_id + 1

        # Set the estimated delivery date (example: 7 days from now)
        estimated_delivery = datetime.now() + timedelta(days=7)

        # Update the payment method and invoice_id in the orders table
        cursor.execute("UPDATE orders SET payment_method = %s, invoice_id = %s WHERE order_id = %s", (payment_method, invoice_id, order_id))

        if payment_method == 'COD':
            # Update payment status to COD
            cursor.execute("""
                UPDATE orders 
                SET payment_status = 'COD', estimated_delivery = %s
                WHERE order_id = %s
            """, (estimated_delivery, order_id))
        else:
            # Update order status to 'paid' and set invoice ID
            cursor.execute("""
                UPDATE orders 
                SET payment_status = %s, order_status = %s, estimated_delivery = %s
                WHERE order_id = %s
            """, ('paid', 'pending', estimated_delivery, order_id))

        # Insert payment details into payment_details table
        cursor.execute("""
            INSERT INTO payment_details (order_id, user_id, card_number, name_on_card, expiry_date, cvv)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (order_id, user_id, card_number, name_on_card, expiry_date, cvv))

        conn.commit()

        # Order Confirmation
        order_confirmation = {
            'order_id': order_id,
            'user_id': order[1],
            'product_id': order[2],
            'quantity': order[3],
            'total_price': order[4],
            'payment_method': payment_method,
            'payment_status': 'COD' if payment_method == 'COD' else 'paid',  # Update the payment status
            'order_status': 'pending',  # New column
            'location': ['Delhi', 'Bangalore'],  # New column
            'confirmation_message': 'Your payment has been processed successfully.',
            'estimated_delivery': str(estimated_delivery),  # Convert to string for JSON serialization
            'receipt': 'email receipt would be sent',
            'invoice_id': invoice_id  # Include the invoice ID for both payment methods
        }

        cursor.close()
        conn.close()

        return jsonify({'order_confirmation': order_confirmation}), 200

    except mysql.connector.Error as err:
        return jsonify({'error': f"Database error: {err}"}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500


    
#Products
# GET API to view all products
@app.route('/api/products', methods=['GET'])
def get_all_products():
    try:
        conn = get_database_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT product_id, user_id, product_name, description, quantity_available, unit_price, images FROM products")
        products = cursor.fetchall()
        
        for product in products:
            if product['images']:
                image_paths = json.loads(product['images'])  # Convert JSON string to Python list
                if isinstance(image_paths, list):
                    image_urls = [url_for('uploaded_file', filename=os.path.basename(filename.strip()), _external=True) for filename in image_paths]
                    product['images'] = image_urls
                else:
                    product['images'] = [url_for('uploaded_file', filename=os.path.basename(image_paths.strip()), _external=True)]
        
        cursor.close()
        conn.close()  # Close connection after fetching results
        return jsonify(products)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#GET API to view particular products
@app.route('/api/product/<int:product_id>', methods=['GET'])
def get_product(product_id):
    conn = get_database_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT product_id, user_id, product_name, description, quantity_available, unit_price, images FROM products WHERE product_id = %s", (product_id,))
    product = cursor.fetchone()
    
    if product:
        if product['images']:
            # Parse the images JSON string
            image_paths = json.loads(product['images'])
            # Generate URLs for each image
            product['images'] = [url_for('uploaded_file', filename=os.path.basename(path.strip()), _external=True) for path in image_paths]
        return jsonify(product)
    else:
        return jsonify({'message': 'Product not found'}), 404

# Route to get product image
@app.route('/api/product_image/<int:product_id>/<path:image_path>', methods=['GET'])
def get_product_image(product_id, image_path):
    conn = get_database_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    cursor = conn.cursor()
    
    try:
        # Check if the product exists
        cursor.execute('SELECT COUNT(*) FROM products WHERE product_id = %s', (product_id,))
        product_count = cursor.fetchone()[0]
        
        if product_count == 0:
            return jsonify({'error': 'Product not found'}), 404
        
        # Check if the image path exists for the product
        cursor.execute('SELECT COUNT(*) FROM products WHERE product_id = %s AND FIND_IN_SET(%s, images)', (product_id, image_path))
        result = cursor.fetchone()[0]
        
        if result == 0:
            return jsonify({'error': 'Image not found for the given product_id'}), 404
        
        upload_folder = app.config['UPLOAD_FOLDER']
        image_full_path = os.path.join(upload_folder, image_path)
        
        print(f"Attempting to fetch image from path: {image_full_path}")  # Debugging statement
        
        if not os.path.isfile(image_full_path):
            return jsonify({'error': 'Image file not found'}), 404
        
        return send_file(image_full_path, mimetype='image/jpeg')
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    finally:
        cursor.close()
        conn.close()

# Helper function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == '__main__':
    app.run(debug=True)