const app = require('../src/app');
const database = require('../src/database');

describe('Blogposts endpoints', () => {
  it('GET /blogpost responds with an array of blogposts', () => {
    return supertest(app)
      .get('/api/blogpost')
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an('array')
        expect(res.body[1]).to.have.property('id' && 'content')
      })
  })

  it(`GET /blogpost/blogpost_id responds with blogpost object`, () => {
    return supertest(app)
      .get('/api/blogpost/2')
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('id' && 'content' && 'createdAt' && 'published')
        expect(res.body.content).to.be.a('string')
      })
  })

  describe(`Protected endpoints w/o auth`, () => {
    it(`responds 'unauthorized' when POST-ing and not signed in via Okta`, () => {
      return supertest(app)
        .post('/api/blogpost')
        .expect(401)
        .expect(res => {
          expect(res.body).to.eql({ message: 'Unauthorized'})
        })
    })

    it(`responds 'unauthorized' when DELETE-ing and not signed in via Okta`, () => {
      return supertest(app)
        .delete('/api/blogpost/1')
        .expect(401)
        .expect(res => {
          expect(res.body).to.eql({ message: 'Unauthorized'})
        })
    })

    it(`responds 'unauthorized' when PUT-ing and not signed in via Okta`, () => {
      return supertest(app)
        .put('/api/blogpost/1')
        .expect(401)
        .expect(res => {
          expect(res.body).to.eql({ message: 'Unauthorized'})
        })
    })
  })
})