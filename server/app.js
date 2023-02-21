const { table } = require('console');
const { createServer } = require('http');
const { Client } = require('pg')

//postgres locally hosted
const client = new Client({
  user: 'Mehakpreet1',
  host: 'localhost',
  database: 'barbershop',
  password: 'password',
  port: 5432,
})

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const server = createServer()

server.listen(32343)
