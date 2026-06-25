CREATE DATABASE ecommerce_db;  //phpmyadmin all over code

USE ecommerce_db;

CREATE TABLE users(
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100),
 email VARCHAR(100) UNIQUE,
 password VARCHAR(255)
);

CREATE TABLE products(
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100),
 price DECIMAL(10,2),
 description TEXT,
 image VARCHAR(255)
);

CREATE TABLE orders(
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT,
 total DECIMAL(10,2),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products(name,price,description,image)
VALUES
('Laptop',50000,'Gaming Laptop','laptop.jpg'),
('Phone',25000,'Android Phone','phone.jpg'),
('Headphones',3000,'Wireless Headphones','headphones.jpg');

SELECT * FROM orders;