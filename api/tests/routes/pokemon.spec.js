/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
  image: 'https://example.com/pikachu.jpg',
  health: 100,
  attack: 50,
  defense: 40,
  speed: 90,
  height: 1.2,
  weight: 6.0,
  typeIds: [1, 2], // Assuming these types exist in your Type model
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate().catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon)));

  describe('GET /pokemons', () => {
    it('should get 200', () => agent.get('/pokemons').expect(200));
  });

  describe('POST /pokemons', () => {
    it('should create a new Pokemon', (done) => {
      agent
        .post('/pokemons')
        .send({
          name: 'Charmander',
          image: 'https://example.com/charmander.jpg',
          health: 100,
          attack: 60,
          defense: 50,
          speed: 90,
          height: 1.0,
          weight: 8.5,
          typeIds: [3, 4], // Assuming these types exist in your Type model
        })
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.property('name', 'Charmander');
          done();
        })
        .catch((err) => done(err));
    });
  });
});
