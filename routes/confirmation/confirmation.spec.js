const request = require('supertest')
const app = require('../../app.js')

describe('Test confirmation urls', () => {
  const urls = ['/review', '/checkAnswers', '/confirmation']

  urls.map(url => {
    test(`${url} returns a 200 response`, async () => {
      const response = await request(app).get(url)
      expect(response.statusCode).toBe(200)
    })
  })
})

describe('Test /review', () => {
  describe('POST responses', () => {
    test('it returns a 422 response if no values are posted', async () => {
      const response = await request(app).post('/review')
      expect(response.statusCode).toBe(422)
    })

    test('it returns a 422 response for no posted value', async () => {
      const response = await request(app)
        .post('/review')
        .send({ redirect: '/' })
      expect(response.statusCode).toBe(422)
    })

    test('it returns a 500 response if no redirect is provided', async () => {
      const response = await request(app)
        .post('/review')
        .send({ review: 'review' })
      expect(response.statusCode).toBe(500)
    })

    test('it returns a 422 response for the wrong value', async () => {
      const response = await request(app)
        .post('/review')
        .send({ review: 'get er done', redirect: '/' })
      expect(response.statusCode).toBe(422)
    })

    test('it returns a 302 response for the right value', async () => {
      const response = await request(app)
        .post('/review')
        .send({ review: 'review', redirect: '/' })
      expect(response.statusCode).toBe(302)
      expect(response.headers.location).toEqual('/')
    })
  })
})
