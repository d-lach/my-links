const links = ['bitcoin', 'ethereum', 'monero', 'litecoin', 'ripple'];
const users = ['testx1@test', 'testx2@test', 'testx3@test', 'testx4@test', 'testx5@test'];

function getTarget(link) {
    return 'https://www.google.com/search?q=' + link;
}

export const testLinks = (function* () {
    for (let i = 0; true; i = (++i) % links.length)
        yield {
            link: links[i],
            target: getTarget(links[i])
        };
})();

export const testUsers = (function* () {
    for (let i = 0; true; i = (++i) % users.length)
        yield {
            email: users[i],
            password: 'test'
        };
})();
