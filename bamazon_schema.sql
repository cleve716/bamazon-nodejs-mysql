DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45) NULL,
department_name VARCHAR(45) NOT NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);

SELECT * FROM PRODUCTS;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Anti-gravity Jet Pack", "You Wish", 139.95, 40),
  ("Invisibility Cloak", "You Wish", 49.95, 45),
  ("Phaser", "You Wish", 119.95, 50),
  ("Head Poker", "Zompocalypse", 19.95, 5),
  ("Solid Rubber Tire", "Zompocalypse", 59.95, 120),
  ("Water Filter Straw", "Zompocalypse", 9.95, 400),
  ("Inflatable Tent", "Camping", 299.95, 8),
  ("Pop-up Canopy", "Camping", 99.95, 15),
  ("Origami Kayak", "Camping", 499.95, 20);
  
