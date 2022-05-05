DROP DATABASE RESTORDERS;
CREATE DATABASE RESTORDERS;

/** 
            DDL
*/
-- Simple Tables
START TRANSACTION;
CREATE TABLE IF NOT EXISTS Mesas (
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_mesa VARCHAR(50) NOT NULL,
    habilitada BOOLEAN NOT NULL
);
    
CREATE TABLE IF NOT EXISTS Usuario(
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    usuario VARCHAR(30) NOT NULL,
    password VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS Clientes (
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    apellido VARCHAR(150) NOT NULL,
    cedula VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    
CREATE TABLE IF NOT EXISTS CategoriaProductos (
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_categoria VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS Productos (
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Nombre VARCHAR(150) NOT NULL,
    categoriaid INT NOT NULL, 
    cant_disponible INT DEFAULT(0), 
    precio_unit_sin_iva DECIMAL DEFAULT(0.0) NOT NULL,
    precio_unit_con_iva DECIMAL DEFAULT(0.0) NOT NULL,
    tipo_iva INT NOT NULL,
    FOREIGN KEY (categoriaid) REFERENCES CategoriaProductos(ID)
);
    
CREATE TABLE IF NOT EXISTS TipoOrdenes(
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tipo_orden VARCHAR(20) NOT NULL --  (Orden Rapida/Cliente)
);

CREATE TABLE IF NOT EXISTS TipoPago(
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tipo_pago VARCHAR(20) NOT NULL --  (Efectivo/Tarjeta/Transferencia)
);
COMMIT;


-- Relation Tables
START TRANSACTION;
CREATE TABLE IF NOT EXISTS PreOrden (
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tipo_orden INT NOT NULL,
    mesa_id INT NOT NULL,
    cliente_id INT NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estado INT DEFAULT(1) NOT NULL,
    FOREIGN KEY(tipo_orden) REFERENCES TipoOrdenes(ID),
    FOREIGN KEY(mesa_id) REFERENCES Mesas(ID),
    FOREIGN KEY(cliente_id) REFERENCES Clientes(ID)
);
    
CREATE TABLE IF NOT EXISTS DetallePreOrden (
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    pre_orden_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT DEFAULT(1) NOT NULL,
    FOREIGN KEY(pre_orden_id) REFERENCES PreOrden(ID),
    FOREIGN KEY(producto_id) REFERENCES Productos(ID)
);

CREATE TABLE IF NOT EXISTS Factura(
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    pre_orden_id INT NOT NULL, 
    tipo_pago INT NOT NULL,
    precio_sin_iva DECIMAL DEFAULT(0.0) NOT NULL,
    precio_con_iva DECIMAL DEFAULT(0.0) NOT NULL,
    precio_propina DECIMAL DEFAULT(0.0) NOT NULL,
    FOREIGN KEY(pre_orden_id) REFERENCES PreOrden(ID),
    FOREIGN KEY(tipo_pago) REFERENCES TipoPago(ID)
);

CREATE TABLE IF NOT EXISTS PreferenciasUsuario(
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    mesero_id INT NOT NULL,
    producto_id INT NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY(mesero_id) REFERENCES Usuario(ID),
    FOREIGN KEY(producto_id) REFERENCES Productos(ID)
);
COMMIT;
/** 
            DML BASE
*/
START TRANSACTION;
INSERT INTO CategoriaProductos(nombre_categoria)
VALUES ('General');

INSERT INTO TipoOrdenes(tipo_orden)
VALUES ('Orden Rapida'), ('Cliente');

INSERT INTO TipoPago(tipo_pago)
VALUES ('Efectivo'),('Tarjeta'),('Transferencia');

INSERT INTO Mesas(nombre_mesa, habilitada)
VALUES ('MESA 1', true),('MESA 2', true),('MESA 3', true);

INSERT INTO ClienteS(nombre, apellido, cedula, email, telefono)
VALUES ('CLIENTE DEFAULT', '', 0, '', '');
COMMIT;
