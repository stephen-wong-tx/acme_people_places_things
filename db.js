const Sequelize = require('sequelize');
const { STRING } = Sequelize.DataTypes;

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_people_places_things');

const data = {
  people: ['moe', 'larry', 'lucy', 'ethyl'],
  places: ['paris', 'nyc', 'chicago', 'london'],
  things: ['foo', 'bar', 'bazz', 'quq']
};

const Person = db.define('person', {
  name: {
    type: STRING,
    unique: true
  }
})

const Place = db.define('place', {
  name: {
    type: STRING,
    unique: true
  }
})

const Thing = db.define('thing', {
  name: {
    type: STRING,
    unique: true
  }
})

const Souvenir = db.define('souvenir', {})


const syncAndSeed = async () => {
  await db.sync({ force: true });
  await Promise.all(data.people.map( person => Person.create({ name: person })));
  await Promise.all(data.places.map( place => Place.create({ name: place })));
  await Promise.all(data.things.map( thing => Thing.create({ name: thing })));
}

Souvenir.belongsTo(Person);
Souvenir.belongsTo(Place);
Souvenir.belongsTo(Thing);

module.exports = {
  syncAndSeed,
  models: {
    Person,
    Place, 
    Thing,
    Souvenir
  }
}