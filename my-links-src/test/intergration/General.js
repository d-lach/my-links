describe("General", () => {
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

    let links = ['test-link-1', 'test-link-2'];
    for (let link of links) {
        it("server handles redirection properly (" + (links.indexOf(link) + 1) + "/" +links.length + ")", (done) => {
            chai.request(app)
                .get('/>/' + link)
                .redirects(0)
                .end((err, res) => {
                    res.should.have.status(302);
                    done();
                });
        });
    }
});
