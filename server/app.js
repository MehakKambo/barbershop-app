var express = require('express')
var http = require('http')
var path = require('path')
var bodyParser = require('body-parser')
const {Client} = require('pg')
var app = express();
var server = http.createServer(app)
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

//postgres locally hosted
const client = new Client({
  user: 'Mehakpreet1',
  host: 'localhost',
  database: 'example',
  password: 'password',
  port: 5432,
})

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static("../frontend"))

app.get('/', (req, res) => {
  res.sendFile(path.resolve('../frontend/book.html'));
});

app.post('/appointment', (req, res) => {
  const { services, barbers, date, time } = req.body;
  const query = 'INSERT INTO appointments (service_name, barber_name, date, time) VALUES ($1, $2, $3, $4)';
  const values = [services, barbers, date, time]
  client.query(query, values, (error, result) =>{
    if(error) {
      console.error(error)
      res.status(500).send('Error inserting date into the database')
    } else {
      console.log("Data inserted successfully")
      res.status(200).send("data inserted successfully")
    }
  });
});

server.listen(3000,function() { 
  console.log("Server listening on port: 3000")
});
