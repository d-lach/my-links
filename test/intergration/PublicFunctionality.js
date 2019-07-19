import LinksRepository from "../../server/repositories/LinksRepository";
import { testLinks } from "../TestData";

describe("Public links customization", () => {
    let recentLink = null;

    before(async () => {
        let links = new LinksRepository();
        await links.removeAll();
    });

    it("should fetch empty links list", (done) => {
        chai.request(app)
            .get('/api/link')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.length(0);
                done();
            });
    });

    it("should create link", (done) => {
        let target = testLinks.next().value.target;

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
        let testLink = testLinks.next().value;

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

    it("should handle invalid link request", (done) => {
        chai.request(app)
            .get('/api/link/invalid-link-name')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it("should fetch few links", (done) => {
        chai.request(app)
            .get('/api/link')
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.have.length(2);
                done();
            });
    });

    it("should modify link", (done) => {
        let testLink = testLinks.next().value;

        chai.request(app)
            .put('/api/link/' + recentLink.link)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ target: testLink.target })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('link').and.to.be.equal(recentLink.link);
                res.body.should.have.property('target').and.to.be.equal(testLink.target);
                recentLink = res.body;
                done();
            });
    });

    it("should handle update of invalid link", (done) => {
        chai.request(app)
            .delete('/api/link/invalid-link-name')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it("should remove one link by id", (done) => {
        chai.request(app)
            .delete('/api/link/' + recentLink.link)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });

    it("should handle removal of non existent link", (done) => {
        chai.request(app)
            .delete('/api/link/invalid-link-name')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it("should fetch 1 link", (done) => {
        chai.request(app)
            .get('/api/link')
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.have.length(1);
                done();
            });
    });
});
