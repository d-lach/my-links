import {testLinks, testUsers} from "../TestData";

let tester = null;

describe ("User authorization", () => {
    before(async () => {
        await bootstrap.usersRepository.removeAll();
        await bootstrap.linksRepository.removeAll();
    });

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
                tester.token = res.body.token;
                done();
            });
    });

    it("should get user info", (done) => {
        chai.request(app)
            .get('/api/user/me')
            .set('Authorization', 'Bearer ' + tester.token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('email').and.to.be.equal(tester.email);
                res.body.should.have.property('permissions').and.to.be.equal(1);
                done();
            });
    });
});

describe("Private links management", () => {
    before(async () => {
        if (!tester)
            throw new Error('cannot test user actions without valid user');
    });

    it("should fetch 0 private links", (done) => {
        chai.request(app)
            .get('/api/user/link')
            .set('Authorization', 'Bearer ' + tester.token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('links').and.to.be.empty;
                done();
            });
    });

    let testLink = testLinks.next().value;
    it("should add private link", (done) => {
        chai.request(app)
            .post('/api/user/link')
            .set('Authorization', 'Bearer ' + tester.token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(testLink)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('target').and.to.be.equal(testLink.target);
                res.body.should.have.property('link').and.to.be.equal(testLink.link);
                done();
            });
    });

    it("should get single private link", (done) => {
        chai.request(app)
            .get('/api/user/link/' + testLink.link)
            .set('Authorization', 'Bearer ' + tester.token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should fetch 5 private links", async () => {
        let testerModel = await bootstrap.usersRepository.find(tester.email);
        for (let i = 0; i < 4; i++)
            await bootstrap.privateLinksRepository.add(testerModel, testLinks.next().value);

        return chai.request(app)
            .get('/api/user/link')
            .set('Authorization', 'Bearer ' + tester.token)
            .then((res) => {
                res.should.have.status(200);
                res.body.should.have.property('links').and.to.have.length(5);
            });
    });

    it("should modify private link", (done) => {
        let updatedTestLink = testLinks.next().value;

        chai.request(app)
            .put('/api/user/link/' + testLink.link)
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + tester.token)
            .send({ target: testLink.target })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('link').and.to.be.equal(testLink.link);
                res.body.should.have.property('target').and.to.be.equal(updatedTestLink.target);
                testLink = res.body;
                done();
            });
    });

    it("should remove private link", (done) => {
        chai.request(app)
            .delete('/api/user/link/' + testLink.link)
            .set('Authorization', 'Bearer ' + tester.token)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });

    it("should fetch 4 private links", (done) => {
        chai.request(app)
            .get('/api/user/link')
            .set('Authorization', 'Bearer ' + tester.token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('links').and.to.have.length(4);
                done()
            });
    });
});
