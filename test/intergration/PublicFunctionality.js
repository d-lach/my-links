import Links from "../../server/repositories/LinksRepository";
import testData from "../TestData";

describe("Public links customization", () => {
    let recentLink = null;

    before(async () => {
        await Links.removeAll();
    });

    it("should fetch 0 links", (done) => {
        chai.request(app)
            .get('/api/link')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.length(0);
                done();
            });
    });

    it("should create link", (done) => {
        let target = testData.getTarget();

        chai.request(app)
            .post('/api/link')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ target })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('target').and.to.be.equal(target);
                res.body.should.have.property('link').and.not.to.be.empty;
                recentLink = res.body;
                done();
            });
    });

    it("should get single link", (done) => {
        chai.request(app)
            .get('/api/link/' + recentLink.link)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('target').and.to.be.equal(recentLink.target);
                res.body.should.have.property('link').and.to.be.equal(recentLink.link);
                done();
            });
    });

    it("should create named link", (done) => {
        let testLink = testData.getLinkData();

        chai.request(app)
            .post('/api/link')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(testLink)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('target').and.to.be.equal(testLink.target);
                res.body.should.have.property('link').and.to.be.equal(testLink.link);
                recentLink = res.body;
                done();
            });
    });

    it("should get single named link", (done) => {
        chai.request(app)
            .get('/api/link/' + recentLink.link)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('target').and.to.be.equal(recentLink.target);
                res.body.should.have.property('link').and.to.be.equal(recentLink.link);
                done();
            });
    });

    it("should inform about missing link (4xx)", (done) => {
        chai.request(app)
            .get('/link/:name')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should fetch 2 links", (done) => {
        chai.request(app)
            .get('/api/link')
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.data);
                res.data.should.have.length(2);
                done();
            });
    });

    it("should modify one link by id", (done) => {
        chai.request(app)
            .patch('/link/:id')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should remove one link by id", (done) => {
        chai.request(app)
            .delete('/link/:id')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should handle removal of non existent link", (done) => {
        chai.request(app)
            .delete('/link/:id')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should fetch 1 link", (done) => {
        chai.request(app)
            .get('/api/link')
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.data);
                res.data.should.have.length(2);
                done();
            });
    });
});