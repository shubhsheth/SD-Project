const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index.js");

chai.should();
chai.use(chaiHttp);

describe('Task API', () => {
    /**
     * Login
     */
    describe("POST /login", () => {
        it("It should authenticate login", (done) => {
            const user = {
                "username": "z",
                "password": "test"
            }
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.authentication.should.be.eq("true");
                    done();
                });
        });
        
        it("It should not authenticate login", (done) => {
            const user = {
                "username": "zz",
                "password": "test"
            }
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.authentication.should.be.eq("false");
                    done();
                });
        });
    });


    /**
     * Register
     */
    describe("POST /register", () => {
        it("It should not register", (done) => {
            const user = {
                "username": "z",
                "password": "test"
            }
            chai.request(server)
                .post("/signup")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    /**
     * Get Quote
     */

    /**
     * Get Quote History
     */

    return;
});

