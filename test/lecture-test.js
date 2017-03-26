var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("CLASSROOM unit test",function(){

    var token="";
    var _class="";
    var _lecture="";
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
                for(var i=0;i<res.body.length;i++){
                    _class=res.body[i]._id;
                }
                done();
            });
    });

    it("should add new lecture", function (done) {
        //calling ADD api
        server
            .post('/api/create-lecture')
            .set('Authorization',token)
            .send({
                lectureNumber: 1,
                lectureSummary:"Summary of lec",
                lectureTitle:"Title of lec",
                _class:_class
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });
    });

    it("should return lectures ",function(done){
        // calling home page api
        server
            .get("/api/get-lectures/"+_class)
            .set('Authorization',token)
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                var count=0;
                for(var i=0;i<res.body.length;i++){
                    count+=1;
                    _lecture=res.body[0]._id;
                }
                count.should.equal(3);
                done();
            });
    });

    it("should add new question", function (done) {
        //calling ADD api
        server
            .post('/api/question/create-question')
            .set('Authorization',token)
            .send({
                title: "TItle",
                details:"Summary of question",
                link:"Link of questions",
                _lecture:_lecture
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(false);
                done();
            });
    });

    it("should add new feedback", function (done) {
        //calling ADD api
        server
            .post('/api/feedback/create-feedback')
            .set('Authorization',token)
            .send({
                semantic: "good",
                details:"Summary of question",
                _lecture:_lecture
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(false);
                done();
            });
    });

    it("should add new material", function (done) {
        //calling ADD api
        server
            .post('/api/material/create-material')
            .set('Authorization',token)
            .send({
                type: "text",
                details:"Summary of material",
                link:"None",
                _lecture:_lecture
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