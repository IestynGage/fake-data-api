const request = require('supertest')
const app = require('./server.js')

describe('Server', () => {
  it(`should return 'NOT FOUND' when a request is not recognised`, async () => {
    const res = await request(app)
      .get('/fakeEndpoint')
      .send();
    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({
      message: `Path '/fakeEndpoint' not recognised`
    })
  });

  it(`can add new endpoints`, async () => {
    const res = await request(app)
      .post('/fakeEndpoint')
      .send();
    expect(res.statusCode).toEqual(201)
    expect(res.body).toEqual({
      message: `URL '/fakeEndpoint' added`
    })
  });

  it(`can get a endpoint`, async () => {
    const res = await request(app)
      .get('/fakeEndpoint')
      .send();
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      message: `Found url '/fakeEndpoint`
    })
  });

  it(`can list all endpoints`, async () => {
    const res = await request(app)
      .get('/list')
      .send();
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      paths: ['/fakeEndpoint']
    })
  });
});
app.close();