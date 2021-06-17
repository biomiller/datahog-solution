import request from 'supertest';
import { server } from '../server';
  

describe('POST /getData', () => {

  afterEach(() => {
    server.close();
  });

  it('initiate request for gas data', (done) => {
    request(server)
      .post('/getData')
      .send({
        provider: "gas",
        callbackUrl: "/testGas"
      })
      .expect(200)
      .end(done)
  });

  it('retrieve internet response data', (done) => {
    request(server)
      .get('/testGas')
      .expect(function(res) {
        res.body[0].billedOn = '2020-04-07T15:03:14.257Z';
        res.body[0].amount = 22.27;
        res.body[1].billedOn = '2020-05-07T15:03:14.257Z';
        res.body[1].amount = 30;
      })
      .end(done);  
  });

  it('initiate request for internet data', (done) => {
    request(server)
      .post('/getData')
      .send({
        provider: "internet",
        callbackUrl: "/testInternet"
      })
      .expect(200)
      .end(done)
  });

  it('retrieve internet response data', (done) => {
    request(server)
      .get('/testInternet')
      .expect(function(res) {
        res.body[0].billedOn = '2020-02-07T15:03:14.257Z';
        res.body[0].amount = 15.12;
        res.body[1].billedOn = '2020-03-07T15:03:14.257Z';
        res.body[1].amount = 15.12;
      })
      .end(done);  
  });
});