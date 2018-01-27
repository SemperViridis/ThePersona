const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/index');

const should = chai.should();
chai.use(chaiHttp);

describe('RESTful API', () => {
  describe('/api/users', () => {
    describe('GET', () => {
      it('respond with a 200 (OK) on success', (done) => {
        chai.request(server)
          .get('/api/users')
          .end((err, res) => {
            if (err) {
              res.should.have.status(500);
            } else {
              res.should.have.status(200);
            }
            done();
          });
      });
    });
  });
});