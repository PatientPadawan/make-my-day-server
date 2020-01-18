const rewiremock = require('rewiremock').default;
const fixtureMaker = require('sequelize-fixtures');

const app = require('../src/app');
const blogpostFixtures = require('./fixtures');

describe.only('Blogposts endpoints', () => {
    beforeEach(() => rewiremock.enable());
    afterEach(() => rewiremock.disable());

    rewiremock.inScope(() => {
        let sequelize = require('../src/database')
    
        before('drop tables and recreate them', async () => {
            await sequelize
            .sync({ force: true }) 
            // wait 1 second for database to clean and re-create
            .then(await new Promise((resolve, reject) => setTimeout(resolve, 1000)))
            // add fixtures to database
            .then(fixtureMaker.loadFixtures(blogpostFixtures, sequelize.models));
        })

        context('Without auth', () => {
            it('responds with an array of blogposts', () => {
                return supertest(app)
                    .get('/api/blogpost')
                    .expect(200)
                    .expect(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.have.property('id' && 'content')
                })
            })
            
            it(`responds with a specific blogpost object`, () => {
            return supertest(app)
                .get('/api/blogpost/1')
                .expect(200)
                .expect(res => {
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('id' && 'content' && 'createdAt' && 'published')
                expect(res.body.content).to.be.a('string')
                })
            })
            
            describe(`Protected endpoints`, () => {
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
    })
    
    rewiremock.inScope(() => {
        context('With auth', () => {
            const mockAuth = (req, res, next) => {
                console.log('MOCK AUTH RAN')
                return next()
            }
              
            rewiremock('./middleware/okta-auth').with(mockAuth);
            rewiremock.enable();
            let sequelize = require('../src/database')
            rewiremock.disable();

            describe('Protected endpoints', () => {
                it('adds a post to the database', () => {
                    return supertest(app)
                    .post('/api/blogpost')
                    .send({
                      "content": "<h1>Hi</h1>",
                      "published": "false"
                    })
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('id' && 'content' && 'createdAt' && 'published')
                        expect(res.body.content).to.eql("<h1>Hi</h1>")
                        expect(res.body.published).to.eql(false)
                    })
                })
            
                it('deletes a post from the database', () => {
                    return supertest(app)
                    .delete('/api/blogpost/1')
                    .expect(200)
                    .expect(res => {
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.eql({})
                    })
                })
            
                it('updates a post in the database', () => {
                    const editedPost = {
                      "content": "<h1>Alex</h1>",
                      "published": "true"
                    }
                    
                    return supertest(app)
                    .put('/api/blogpost/5')
                    .send(editedPost)
                    .expect(200)
                    .expect(res => {
                      expect(res.body).to.be.an('object')
                      expect(res.body).to.have.property('id' && 'content' && 'createdAt' && 'published')
                      expect(res.body.content).to.eql("<h1>Alex</h1>")
                      expect(res.body.published).to.eql(true)
                    })
                })
            })
        })
    })
})