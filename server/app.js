var express = require('express')
var http = require('http')
var path = require('path')
var bodyParser = require('body-parser')
const {Client} = require('pg')
var app = express();
var exphbs = require('express-handlebars')
var server = http.createServer(app)
var alert = require('alert')

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


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("../frontend"))
const viewsPath = path.join(__dirname, 'views')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', viewsPath)

app.get('/', (req, res) => {
  res.sendFile(path.resolve('../frontend/book.html'));
});

app.post('/appointment', (req, res) => {
  //const { services, barbers, date, time } = req.body;
  const service = req.body.services;
  const barber = req.body.barbers;
  const date = req.body.date;
  const time = req.body.time;
  const customerName = req.body.customer_name
  const customerEmail = req.body.customer_email
  //console.log(req.body)
  const check = 'SELECT id FROM appointments WHERE barber_name = $1 and date = $2 and time = $3'
  //const values = [services, barbers, date, time]
  client.query(check, [barber, date, time], (checkError, checkResult) => {
    if(checkError) {
      res.status(500).send("Server Error, please try later! " + checkError.message)
    } 
    else {
      if(checkResult.rows.length > 0) {
        //the same appointment already exists
        
        alert(time + " with " + barber + " on " + date + " is already booked, please select another one!")
        res.redirect('/book.html') 
      } 
      else {
        const insert = 'INSERT INTO appointments (service_name, barber_name, date, time, customer_name, customer_email) VALUES ($1, $2, $3, $4, $5, $6)'
        client.query(insert, [service, barber, date, time, customerName, customerEmail], (error, result) =>{
        if(error) {
          console.error(error)
            res.status(500).send('Error inserting date into the database ' + error.message)
           } 
          else {
            console.log("Data inserted successfully")
            res.status(200)
            //redirect to the confirmation page
            res.render('home', {
              service_name: service, 
              barber_name: barber, 
              appt_date: date, 
              appt_time: time,  
              customer_name: customerName,
              customer_email: customerEmail})
           }
         });
      }
    }
  }) 
});

server.listen(3000,function() { 
  console.log("Server listening on port: 3000")
});
