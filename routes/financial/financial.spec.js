const request = require('supertest')
const app = require('../../app.js')

describe('Test /financial responses', () => {
  test('it returns a 200 response for /financial/income', async () => {
    const response = await request(app).get('/financial/income')
    expect(response.statusCode).toBe(200)
  })

  test('it returns a 422 with no option selected', async () => {
    const response = await request(app)
      .post('/financial/income')
      .send({ redirect: '/personal/maritalStatus' })
    expect(response.statusCode).toBe(422)
  })

  test('it returns a 302 and redirects to offramp when NO is selected', async () => {
    const response = await request(app)
      .post('/financial/income')
      .send({ confirmIncome: 'No', redirect: '/offramp/financial' })
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toEqual('/offramp/financial')
  })

  test('it returns a 302 and redirects to the same page when YES is selected', async () => {
    const response = await request(app)
      .post('/financial/income')
      .send({ confirmIncome: 'Yes', redirect: '/personal/maritalStatus' })
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toEqual('/personal/maritalStatus')
  })

  test('it redirects to the checkAnswers when posting Yes and having come from the checkAnswers page', async () => {
    const response = await request(app)
      .post('/financial/income')
      .query({ref: 'checkAnswers'})
      .send({ confirmIncome: 'Yes', redirect: '/personal/maritalStatus' })
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toEqual('/checkAnswers')
  }) 
})
