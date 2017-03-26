var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("USER unit test", function () {
    it("should add new student user", function (done) {
        //calling ADD api
        server
            .post('/api/sign-up')
            .send({
                firstName: "Chamath",
                lastName: "Abeysinghe",
                accountType: "student",
                email: "abey@gmail.com",
                password: "password"
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });
    });

    it("should log the user", function (done) {
        //calling ADD api
        server
            .post('/api/authenticate')
            .send({
                email: "abey@gmail.com",
                password: "password"
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });
    });

    it("should add new teacher user", function (done) {
        //calling ADD api
        server
            .post('/api/sign-up')
            .send({
                firstName: "Teacher",
                lastName: "Rehcaet",
                accountType: "teacher",
                email: "cd@gmail.com",
                password: "password"
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });
    });

    it("should log the teacher user", function (done) {
        //calling ADD api
        server
            .post('/api/authenticate')
            .send({
                email: "cd@gmail.com",
                password: "password"
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });
    });

});
