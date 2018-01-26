var expect = require('chai').expect;
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../server/index.js');

// Adds support for assertions on array elements
// https://github.com/chaijs/Chai-Things#examples
chai.use(require('chai-things'));

describe('RESTful API', function () {

  // beforeEach(function () {
  //   // Send a deep copy in so internal mutations do not affect our `testUsers` array above
  //   // Note: This copy technique works because we don't have any functions
  //   var usersCopy = JSON.parse(JSON.stringify(testItems));
  //   Users.setAll(usersCopy);
  // });

  describe('api/items', function () {

    describe('GET', function () {

      it('responds with a 200 (OK)', function (done) {

        request(app)
          .get('/api/items')
          .expect(200);
          done();
          app.close();
      });
    });
  });
});
