import Links from "../../server/repositories/LinksRepository"
import { testLinks } from "../TestData"

describe("General", () => {
    let testData = [...Array(5).keys()].map(() => testLinks.next().value);

    before(async () => {
        await Links.removeAll();
        await Links.addMany(testData);
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

    for (let linkData of testData) {
        it("server handles redirection properly (" + (testData.indexOf(linkData) + 1) + "/" + testData.length + ")", (done) => {
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
