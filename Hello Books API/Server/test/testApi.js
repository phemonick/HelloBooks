const app = require('../app');
const mocha = require('mocha');
const chai = require('chai');
let chaiHttp = require('chai-http');
const db = require('../server/models')
const User = require('../server/models').User;
let Books = require('../server/models').Books;
const server = require('../server/routes/index');
const expect = chai.expect;
let faker = require('faker');
let sequelize = require('../server/models').sequelize;
//--compilers js:babel-core/register
// Questions: Classes , ES6 problems maybe babel


//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';


chai.use(chaiHttp);
//Our parent block


let bookid;
let userId;
//Middleware for database
describe('HelloBooks', () => {
    let token;

    before((done) => {
        Books.destroy({ where: {} });
        User.destroy({ where: {} });
        //create dummy books
        let book = Books.create({
            book_title: "Shola comes home",
            books_author: "Benny Ogidan",
            category: "Fiction",
        }).then(book => {
            bookid = (book.id)

        });
        console.log(bookid);

        //Create a dummy user
        let user = User.create({
            username: "Benny",
            password: "benny",
            email: faker.internet.email(),
        }).then(user => {
            userId = (user.id)

        });

        done();
    });

    // describe('Sign In', () => {
    //     it('it returns succesful login if user name and password', (done) => {
    //         chai.request(app)
    //             .post('/api/users/signin')
    //             .send({ username: "Benny", password: "benny" })
    //             .end((err, res) => {
    //                 //if (err) return done(err);
    //                 token = res.body.token;
    //                 expect('Content-Type', /json/)
    //                 expect(res.body).have.property('token');
    //                 console.log(res);
    //                 done();
    //             });
    //     });
    // });


    /*
     *Unauthenticated user tests
     */
    describe('/GET', () => {
        it('Only authenticated users allowed to view books', (done) => {
            chai.request(app)
                .get('/api/books/')
                .end((err, res) => {
                    expect(res.status).to.equal(403);
                    done();
                });
        });
        it('Only authenticated users allowed to see the book list', (done) => {
            chai.request(app)
                .get('/api/users/1/books')
                .end((err, res) => {
                    expect(res.status).to.equal(403);
                    done();
                });
        });


    });

    describe('/POST ', () => {
        it('All users are allowed to register, Sign up successful', (done) => {
            chai.request(app)
                .post('/api/users/signup')
                .send({ username: faker.internet.userName(), password: faker.internet.password })
                .end((err, res) => {
                    expect(201);
                    done();
                });
        });
        it('Only authenticated users allowed to create books', (done) => {
            chai.request(app)
                .post('/api/books/')
                .end((err, res) => {
                    expect(res.status).to.equal(403);
                    done();
                });
        });
        it('Only authenticated users allowed to loan', (done) => {
            chai.request(app)
                .post('/api/users/1/books')
                .end((err, res) => {
                    expect(res.status).to.equal(403);
                    done();
                });
        });
    });
    describe('/PUT', () => {
        it('Only authenticated users allowed to edit books', (done) => {
            chai.request(app)
                .put('/api/books/1')
                .end((err, res) => {
                    expect(res.status).to.equal(403);
                    done();
                });
        });
        it('Only authenticated users allowed to return books', (done) => {
            chai.request(app)
                .put('/api/users/1/books')
                .end((err, res) => {
                    expect(res.status).to.equal(403);
                    done();
                });
        });


    });

    /*
    Authenticated users Tests
    */
    describe('POST /login', () => {
        it('it responds with 401 status code if bad username or password', (done) => {
            chai.request(app)
                .post('api/users/signin')
                .send({ username: faker.internet.userName(), password: faker.internet.password })
                .end((err, res) => {
                    expect(403);
                    done();
                });
        });

        it('it responds with 202 status code if good username or password', (done) => {
            chai.request(app)
                .post('/api/users/signin')
                .send({ username: "Benny", password: "benny" })
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    done();
                });
        });

        it('it returns succesful login if user name and password', (done) => {
            chai.request(app)
                .post('/api/users/signin')
                .send({ username: "Benny", password: "benny" })
                .end((err, res) => {
                    token = res.body.token;
                    //if (err) return done(err);
                    expect('Content-Type', /json/)
                    expect(res.body).have.property('token');
                    //console.log(res);
                    done();
                });
        });

        it('it allows the user to loan a book', (done) => {
            console.log(bookid);
            let userbook = {
                userid: userId,
                book_id: bookid,
                date: '2016-08-09 04:05:02',
                return_status: false
            }
            console.log(userbook, '++++++++++++++++++++++++++++++++++++++++++++++++++++')
            chai.request(app)
                .post('/api/users/' + userbook.userid + '/books')
                .set('x-access-token', token)
                .send(userbook)
                .end((err, res) => {
                    console.log(res.body, '=================response')
                    expect(res.status).to.equal(201)

                    done();
                });
        });


        describe('/GET', () => {
            it('It retrieves all books from the data', (done) => {
                chai.request(app)
                    .get('/api/books')
                    .set('x-access-token', token)
                    .end((err, res) => {
                        //bookid = Books.id
                        expect(res.status).to.equal(200)
                        done();
                    });
            });
        });
        describe('/PUT', () => {
            it('Edit a select book from the data', (done) => {
                chai.request(app)
                    .put('/api/books/' + bookid)
                    .set('x-access-token', token)
                    .send({
                        book_title: "The Chronicles of Andela",
                        books_author: "C.S. Lewis",
                        category: "Action"
                    })
                    .end((err, res) => {
                        expect(res.status).to.equal(200)
                        done();
                    });

            });
            // it('Edit a select book from the data', (done) => {
            //     chai.request(app)
            //         .put('/api/books/' + bookid)
            //         .set('x-access-token', token)
            //         .send({
            //             book_title: "The Chronicles of Andela",
            //             books_author: "C.S. Lewis",
            //             category: "Action"
            //         })
            //         .end((err, res) => {
            //             expect(res.status).to.equal(200)
            //             done();
            //         });

            // });
        });




    });

    // after((done) => {
    //     //     User.drop();
    //     //     Books.drop();
    //     sequelize.sync({ force: true })

    // });

});







/*

Authenticated users
*/



// });
// describe('/POST user signups', () => {
//     it('Users should be able to sign up ', (done) => {
//         let user = {
//             username: "Test user",
//             password: "testuser",
//             email: "test@user.com"
//         }
//         chai.request(app)
//             .post('/api/users/signup')
//             .send(user)
//             .end((err, res) => {
//                 expect(res.status).to.equal(201);
//                 expect(res.body) //res.body.should.be.a('object');
//                     //res.body.should.have.property('errors');
//                     //res.body.errors.should.have.property('pages');
//                     //    res.body.errors.pages.should.have.property('kind').eql('required');
//                 done();
//             });
//     });
//