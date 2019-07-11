describe("Public links customization", () => {
    it("should fetch 0 links", (done) => {
        chai.request(app)
            .get('/link/all')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should fetch 10 links", (done) => {
        chai.request(app)
            .get('/link/all')
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.data);
                res.data.should.have.length(10);
                done();
            });
    });

    it("should create link", (done) => {
        chai.request(app)
            .post('/link')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should create named link", (done) => {
        chai.request(app)
            .post('/link')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({name: 'named-link'})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should get single link by id", (done) => {
        chai.request(app)
            .get('/link')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
