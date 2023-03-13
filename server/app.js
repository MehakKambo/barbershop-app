//Dependencies
let express = require('express')
let app = express();
let http = require('http')
let server = http.createServer(app)
let path = require('path')
let bodyParser = require('body-parser')
const {Client} = require('pg')
let exphbs = require('express-handlebars')
let alert = require('alert')

//postgres locally hosted
const client = new Client({
  user: 'your_username',
  host: 'your_hostname',
  database: 'your_DB_name',
  password: 'your_password',
  port: 5432, //put your port number here
})

//connect to postgres
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//serve the static files and setup templating engine
// to serve dynamic content (appointment confirmation page)
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("../frontend"))
const viewsPath = path.join(__dirname, 'views')
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', viewsPath)

app.get('/', (req, res) => {
  res.sendFile(path.resolve('../frontend/book.html'));
});


// Create appointment
app.post('/appointment', (req, res) => {
  
  const service = req.body.services;
  const barber = req.body.barbers;
  const date = req.body.date;
  const time = req.body.time;
  const customerName = req.body.customer_name
  const customerEmail = req.body.customer_email

  // check if appt. at the same time and the same date already exists
  const check = 'SELECT id FROM appointments WHERE barber_name = $1 and date = $2 and time = $3'

  client.query(check, [barber, date, time], (checkError, checkResult) => {
    if(checkError) {
      //server error
      res.status(500).send("Server Error, please try later! " + checkError.message)
    } 
    else {
      if(checkResult.rows.length > 0) {
        //the same appointment already exists
        alert(time + " with " + barber + " on " + date + " is already booked, please select another one!")
        res.redirect('/book.html') 
      } 
      else {
        // appt. can be created
        const insert = 'INSERT INTO appointments (service_name, barber_name, date, time, customer_name, customer_email) VALUES ($1, $2, $3, $4, $5, $6)'
        
        client.query(insert, [service, barber, date, time, customerName, customerEmail], (error, result) =>{
        if(error) {
          //server error
          console.error(error)
          res.status(500).send('Server Error, please try later! ' + error.message)
        } else {
            console.log("Appointment Created successfully!")
            res.status(200)
            //redirect to the confirmation page and
            // show the appt. details in a table
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
