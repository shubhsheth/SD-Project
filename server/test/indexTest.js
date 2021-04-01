const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index.js");

chai.should();
chai.use(chaiHttp);

describe("Task API", () => {
  /**
   * Login
   */
  describe("POST /login", () => {
    it("It should authenticate login", (done) => {
      const user = {
        username: "z",
        password: "test",
      };
      chai
        .request(server)
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
        username: "zz",
        password: "test",
      };
      chai
        .request(server)
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
        username: "z",
        password: "test",
      };
      chai
        .request(server)
        .post("/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  /**
   * Update Profile
   */
  describe("POST /profile-management", () => {
    it("It should update profile", (done) => {
      const user = {
        userId: 24,
        fullname: "z",
        address1: "test1",
        address2: "test2",
        city: "test3",
        state: "test4",
        zip: "test5",
      };
      chai
        .request(server)
        .post("/profile-management")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /**
   * Get Quote
   */
  describe("GET /quote", () => {
    it("It should get quote", (done) => {
      const quote = {
        location: "TX",
        gallons: 1000,
        userid: 24,
      };
      chai
        .request(server)
        .get("/quote")
        .send(quote)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.margin.should.be.eq(0.225);
          res.body.quote.should.be.eq(1.725);
          res.body.total.should.be.eq(1725);
          done();
        });
    });
  });

  /**
   * Get Quote History
   */
  describe("GET /fuel-history", () => {
    it("It should get history", (done) => {
      const user = {
        userid: 24,
      };
      chai
        .request(server)
        .get("/fuel-history")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.above(0);
          done();
        });
    });
  });

  return;
});
