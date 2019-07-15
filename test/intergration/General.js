import Links from "../../repositories/LinksRepository"
import testData from "../TestData"

describe("General", () => {

    before(async () => {
        await Links.removeAll();
        await Links.addMany(
            testData.links.map(link => ({
                target: testData.getTarget(link),
                link,
            })));
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

    for (let link of testData.links) {
        it("server handles redirection properly (" + (testData.links.indexOf(link) + 1) + "/" + testData.links.length + ")", (done) => {
            chai.request(app)
                .get('/>/' + link)
                .redirects(0)
                .end((err, res) => {
                    res.should.have.status(302);
                    res.header['location'].should.be.equal(testData.getTarget(link));
                    done();
                });
        });
    }
});
