const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate().catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Pokemon.sync({ force: true }));

  describe('Validators', () => {
    it('should throw an error if name is null', (done) => {
      Pokemon.create({})
        .then(() => done(new Error('It requires a valid name')))
        .catch(() => done());
    });

    it('should work when it has a valid name and required fields', (done) => {
      Pokemon.create({
        name: 'Pikachu',
        image: 'https://example.com/pikachu.jpg',
        health: 100,
        attack: 50,
        defense: 40
      })
        .then(() => done())
        .catch((error) => {
          console.error('Error creating Pokemon:', error);
          done(new Error('It should create the Pokemon'));
        });
    });
  });
});
