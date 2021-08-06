const db = require('./db');
const express = require('express');
const app = express();

app.get ('/', async (req, res, next) => {
  const people = await db.models.Person.findAll();
  const places = await db.models.Place.findAll();
  const things = await db.models.Thing.findAll();

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1>Acme People, Places and Things</h1>
    <ul>
      ${people.map( person => {
        return `<li>${person.name}</li>`
      }).join("")}
    </ul>
    <ul>
      ${places.map( place => {
        return `<li>${place.name}</li>`
      }).join("")}
    </ul>
    <ul>
      ${things.map( thing => {
        return `<li>${thing.name}</li>`
      }).join("")}
    </ul>
  </body>
  </html>
  `);
})


const init = async () => {
  await db.syncAndSeed();
  app.listen(3000);
}

init();