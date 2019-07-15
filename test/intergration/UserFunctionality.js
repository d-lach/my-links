describe("Private links management", () => {
    it("should register new user", (done) => {
        chai.request(app)
            .post('/user/new')
            .end((err, res) => {
                res.should.have.status(200);
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
