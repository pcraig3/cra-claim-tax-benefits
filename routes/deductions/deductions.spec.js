const request = require('supertest')
const app = require('../../app.js')

describe('Test /deductions responses', () => {
  describe('Test /deductions/rrsp responses', () => {
    test('it returns a 200 response for /deductions/rrsp', async () => {
      const response = await request(app).get('/deductions/rrsp')
      expect(response.statusCode).toBe(200)
    })
  })

  test('it returns a 200 response for /deductions/rrsp/amount', async () => {
    const response = await request(app).get('/deductions/rrsp')
    expect(response.statusCode).toBe(200)
  })

  test('it returns a 500 response if no redirect is provided', async () => {
    const response = await request(app).post('/deductions/rrsp/amount')
    expect(response.statusCode).toBe(500)
  })
})
