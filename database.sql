DROP DATABASE IF EXISTS barbershop;

CREATE DATABASE barbershop;

\c barbershop;

-- Barber table
CREATE TABLE Barber (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  level VARCHAR(255) NOT NULL
);

-- Customer table
CREATE TABLE Customer (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL
);

-- Services table
CREATE TABLE Services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Appointment table
CREATE TABLE Appointment (
  id SERIAL PRIMARY KEY,
  barberID INTEGER NOT NULL,
  customerID INTEGER NOT NULL,
  serviceID INTEGER NOT NULL,
  date DATE NOT NULL,
  day VARCHAR(255) NOT NULL,
  time TIME NOT NULL,
  FOREIGN KEY (barberID) REFERENCES Barber(id),
  FOREIGN KEY (customerID) REFERENCES Customer(id),
  FOREIGN KEY (serviceID) REFERENCES Services(id)
);

-- Insert the barber records
INSERT INTO barber (name, level)
VALUES
   ('Adien Smith', 'Grand Master'),
   ('Anthony Davis', 'Master'),
   ('Elijah Watkins', 'Master'),
   ('Liam Garcia', 'All Star'),
   ('Lucas Taylor', 'Grand Master'),
   ('Kevin Durak', 'All Star'),
   ('Max Kellerman', 'New Guy'),
   ('Steph Tatum', 'Master'),
   ('Steven A. Smith', 'All Star');

-- Insert the services
INSERT INTO services (name)
VALUES
   ('Braids'),
   ('Haircut'),
   ('Kids Haircut'),
   ('Line Up'),
   ('Razor Shave'),
   ('Senior Haircut'),
   ('Shampoo and Wash');
