CREATE DATABASE SarahGraceDesigns;

CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    price INT,
    color VARCHAR(255),
    productdesc VARCHAR(2048),
    size VARCHAR(255),
    quantity INT,
    productInfo VARCHAR(2048),
    serialNo VARCHAR(255),
    productImgUrl VARCHAR(255)
);

CREATE TABLE productImage (
    id SERIAL PRIMARY KEY,
    productId INT,
    url1 VARCHAR(1024),
    url2 VARCHAR(1024),
    url3 VARCHAR(1024),
    url4 VARCHAR(1024),
    url5 VARCHAR(1024),
	FOREIGN KEY(productId) REFERENCES product(id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    phoneNumber VARCHAR(255),
    address VARCHAR(1024),
    password VARCHAR(255)
);

CREATE TABLE cartItem(
    id SERIAL PRIMARY KEY,
    userid INT,
    productid INT,
    quantity INT,
    size VARCHAR(255),
    FOREIGN KEY(userid) REFERENCES users(id)
    FOREIGN KEY(productid) REFERENCES product(id)
);

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    category VARCHAR(255),
    description VARCHAR(1024)
);

CREATE TABLE productcategories(
    id SERIAL PRIMARY KEY, 
    categoryid INT,
    productid INT
    FOREIGN KEY categoryid REFERENCES categories(id),
    FOREIGN KEY productid REFERENCES product(id)
);

ALTER TABLE cart ALTER COLUMN totalprice SET DEFAULT 0;
