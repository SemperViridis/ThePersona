const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/index');

const should = chai.should();
const expect = require('chai').expect;
chai.use(chaiHttp);

describe('RESTful API', () => {
  describe('/api/users', () => {
    describe('GET', () => {
      it('respond with a 200 (OK) on success', (done) => {
        chai.request(server)
          .get('/api/users')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });
});

// const expect = require('chai').expect;
// const chai = require('chai');
// const request = require('supertest');
// const app = require('../server/index.js');

// app.listen(8080);

// // Adds support for assertions on array elements
// // https://github.com/chaijs/Chai-Things#examples
// chai.use(require('chai-things'));

// describe('RESTful API', function () {

//   // beforeEach(function () {
//   //   // Send a deep copy in so internal mutations do not affect our `testUsers` array above
//   //   // Note: This copy technique works because we don't have any functions
//   //   var usersCopy = JSON.parse(JSON.stringify(testItems));
//   //   Users.setAll(usersCopy);
//   // });

//   describe('api/items', function () {

//     describe('GET', function () {

//       it('responds with a 200 (OK)', function (done) {
//         console.log(done);
//         request(app)
//           .get('/api/items')
//           .expect(404)
//           .end(function(err, res) {
//             if (err) {
//               throw err;
//             } else {
//               done();
//             }
//           });

//       });
//     });
//   });
// });
