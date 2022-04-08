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
    serialNo VARCHAR(255)
);