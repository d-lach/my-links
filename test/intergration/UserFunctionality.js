import UsersRepository from "../../server/repositories/UsersRepository";
import {testUsers} from "../TestData";

describe("Private links management", () => {
    before(async () => {
        let users = new UsersRepository();
        await users.removeAll();
    });

    it("should register new user", (done) => {
        let tester = testUsers.next().value;
        chai.request(app)
            .post('/api/anonymous')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: tester.email,
                password: tester.password
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('permissions').and.to.be.equal(1);
                res.body.should.have.property('email').and.to.be.equal(tester.email);
                done();
            });
    });

    it("should authorize user", (done) => {
        chai.request(app)
            .post('/user/login')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should get user info", (done) => {
        chai.request(app)
            .get('/user')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should fetch 0 private links", (done) => {
        chai.request(app)
            .get('/user/link/all')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should fetch 10 private links", (done) => {
        chai.request(app)
            .get('/user/link/all')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should add private link", (done) => {
        chai.request(app)
            .post('/user/link')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should get single private link", (done) => {
        chai.request(app)
            .get('/user/link')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should remove private link", (done) => {
        chai.request(app)
            .delete('/user/link')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
