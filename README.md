# Barbershop-Webapp

This is a web application for a barbershop. The frontend is built with pure HTML, CSS, and JavaScript, while the backend is built with Node.js and PostgreSQL.

# Demo

![Alt Text](demo.gif)

# Directory-Structure
```bash
├── frontend
│   ├── barbers.html
│   ├── book.html
│   ├── contact.html
│   ├── css
│   │   └── style.css
│   ├── img
│   │   ├── all.png
│   │   ├── gm.png
│   │   ├── logo.png
│   │   ├── master.png
│   │   └── new.png
│   ├── index.html
│   └── js
│       └── index.js
├── schema.sql
└── server
    ├── app.js
    ├── package-lock.json
    ├── package.json
    └── views
        ├── home.handlebars
        └── layouts
            └── main.handlebars

```

# Dependencies
Before you begin, ensure that you have the following installed on your machine:

PostgreSQL
NodeJS

# Build-Instructions
Follow the instructions below to set up and run the application:

1. Start the PostgreSQL server on your local terminal. You should be connected to the default PostgreSQL database.
2. Navigate to the server directory and run the command ```npm install```. This will install all the node dependencies present in package.json.
3. While in the server directory, open the app.js file. Change lines 15, 16, 18, and 19 according to your own PostgreSQL credentials, which include the username, hostname, password, and port number. Do not change the database name. You can run the command ```\conninfo``` in PostgreSQL to get the user and port. The default password is password, and the host is probably localhost.
4. After changing the PostgreSQL credentials, run the schema.sql file (present in the root directory) in your PostgreSQL to create the database and its tables. You can run the command ```\i path_to_sql_file``` in PostgreSQL, where path_to_sql_file is the path to the schema.sql file. Alternatively, you can copy, paste and run each SQL command in the schema.sql file.
5. In the server directory, run the command node app.js. This will start the Node.js server at localhost:3000 if all the previous steps were successful.
6. Visit ```http://localhost:3000/``` after starting the Node.js server. The website will be there, and you can perform all the scenarios. After creating an appointment, make sure you are connected to the barbershop database in PostgreSQL, and then run the command ```SELECT * FROM APPOINTMENTS;``` to see the appointment data added to the database.
