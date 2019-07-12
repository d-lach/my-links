import Links from "../../repositories/LinksRepository"

describe("General", () => {

    let testLinks = ['bitcoin', 'ethereum', 'monero', 'litecoin', 'ripple'];
    let getTestTarget = (link) => 'https://www.google.com/search?q=' + link;
    before(async () => {
        await Links.removeAll();
        await Links.addMany(testLinks.map(link => ({
            target: getTestTarget(link),
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

    for (let link of testLinks) {
        it("server handles redirection properly (" + (testLinks.indexOf(link) + 1) + "/" + testLinks.length + ")", (done) => {
            chai.request(app)
                .get('/>/' + link)
                .redirects(0)
                .end((err, res) => {
                    res.should.have.status(302);
                    res.header['location'].should.be.equal(getTestTarget(link));
                    done();
                });
        });
    }
});
