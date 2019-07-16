import Links from "../../server/repositories/LinksRepository"
import testData from "../TestData"

describe("General", () => {
    let testLinks = [...Array(5).keys()].map(() => testData.next().value);

    before(async () => {
        await Links.removeAll();
        await Links.addMany(testLinks);
    });

    it("server should be up and running", (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(204);
                should.exist(res.body);
                res.body.should.be.empty;
                done();
            });
    });

    for (let linkData of testLinks) {
        it("server handles redirection properly (" + (testLinks.indexOf(linkData) + 1) + "/" + testLinks.length + ")", (done) => {
            chai.request(app)
                .get('/>/' + linkData.link)
                .redirects(0)
                .end((err, res) => {
                    res.should.have.status(302);
                    res.header['location'].should.be.equal(linkData.target);
                    done();
                });
        });
    }
});
