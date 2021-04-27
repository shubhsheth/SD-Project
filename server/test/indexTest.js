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
          res.body.authentication.should.be.eq(true);
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
          res.body.authentication.should.be.eq(false);
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
        state: "TX",
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
  describe("POST /quote", () => {
    it("It should get quote", (done) => {
      const quote = {
        location: "TX",
        gallons: 1000,
        userid: 24,
      };
      chai
        .request(server)
        .post("/quote")
        .send(quote)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.margin.should.be.eq(0.21);
          res.body.quote.should.be.eq(1.71);
          res.body.total.should.be.eq(1710);
          done();
        });
    });

    it("It should fail to get quote", (done) => {
      const quote = {
        gallons: 1000,
        userid: 24,
      };
      chai
        .request(server)
        .post("/quote")
        .send(quote)
        .end((err, res) => {
          res.body.errors.length.should.be.above(0);
          res.should.have.status(400);
          done();
        });
    });

    it("It should fail to get quote", (done) => {
      const quote = {
        location: "TX",
        userid: 24,
      };
      chai
        .request(server)
        .post("/quote")
        .send(quote)
        .end((err, res) => {
          res.body.errors.length.should.be.above(0);
          res.should.have.status(400);
          done();
        });
    });

    it("It should fail to get quote", (done) => {
      const quote = {
        location: "TX",
        gallons: 1000,
      };
      chai
        .request(server)
        .post("/quote")
        .send(quote)
        .end((err, res) => {
          res.body.errors.length.should.be.above(0);
          res.should.have.status(400);
          done();
        });
    });
  });

  /**
   * Get Quote History
   */
  describe("POST /fuel-history", () => {
    it("It should get history", (done) => {
      const user = {
        userid: 24,
      };
      chai
        .request(server)
        .post("/fuel-history")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.above(0);
          done();
        });
    });

    it("It should not get history", (done) => {
      const user = {};
      chai
        .request(server)
        .post("/fuel-history")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });


  /**
   * Save to Quote History
   */
  describe("POST /save-quote", () => {
    it("It should save history", (done) => {
      const user = {
        "location": "TX",
        "gallons": 1000,
        "userid": 34,
        "quote": 11
      };
      chai
        .request(server)
        .post("/save-quote")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("It should not save history", (done) => {
      const user = {
        "gallons": 1000,
        "userid": 34,
        "quote": 11
      };
      chai
        .request(server)
        .post("/save-quote")
        .send(user)
        .end((err, res) => {
          res.body.errors.length.should.be.above(0);
          res.should.have.status(400);
          done();
        });
    });

    it("It should not save history", (done) => {
      const user = {
        "location": "TX",
        "userid": 34,
        "quote": 11
      };
      chai
        .request(server)
        .post("/save-quote")
        .send(user)
        .end((err, res) => {
          res.body.errors.length.should.be.above(0);
          res.should.have.status(400);
          done();
        });
    });

    it("It should not save history", (done) => {
      const user = {
        "location": "TX",
        "gallons": 1000,
        "quote": 11
      };
      chai
        .request(server)
        .post("/save-quote")
        .send(user)
        .end((err, res) => {
          res.body.errors.length.should.be.above(0);
          res.should.have.status(400);
          done();
        });
    });
  });

  return;
});
