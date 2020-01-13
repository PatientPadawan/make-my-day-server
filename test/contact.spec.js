const app = require('../src/app');

describe('Contact endpoints', () => {
    it(`responds 200 and sends email`, () => {
        return supertest(app)
            .post('/api/contact')
            .expect(200)
    })
})