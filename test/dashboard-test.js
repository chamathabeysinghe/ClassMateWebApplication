var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("DASHBOARD unit test",function(){

    var token="";
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
                token=res.body.token;
                done();
            });
    });

    it("should add new class", function (done) {
        //calling ADD api
        server
            .post('/api/create-class')
            .set('Authorization',token)
            .send({
                name: "Class1",
                startTime: "4:00PM",
                endTime:"6:00PM",
                location:"Horana",
                isDiscoverable:true
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });
    });


    it("should return classes ",function(done){
        // calling home page api
        server
            .get("/api/get-class")
            .set('Authorization',token)
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                done();
            });
    });

});