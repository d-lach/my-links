import {testUsers} from "../TestData";

describe("Private links management", () => {
    before(async () => {
        await bootstrap.usersRepository.removeAll();
    });

    let tester = null;
    it("should register new user", (done) => {
        tester = testUsers.next().value;
        chai.request(app)
            .post('/api/anonymous')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(tester)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('permissions').and.to.be.equal(1);
                res.body.should.have.property('email').and.to.be.equal(tester.email);
                done();
            });
    });

    it("should authorize user and assign valid access token", (done) => {
        chai.request(app)
            .post('/api/anonymous/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(tester)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token').and.not.to.be.empty;
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
