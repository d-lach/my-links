const links = ['bitcoin', 'ethereum', 'monero', 'litecoin', 'ripple'];

export const testLinks = (function* () {

    for (let i = 0; true; ++i)
        yield {
            link: getLink(i),
            target: getTarget(i)
        };
})();

export const testUsers = (function* () {
    for (let i = 1; true; i++)
        yield {
            email: getEmail(i),
            password: 'test'
        };
})();

function getTarget(index) {
    return 'https://www.google.com/search?q=' + links[index % links.length];
}

function getLink(index) {
    let link = links[index % links.length];
    if (index > links.length)
        link = link + '-' + Math.floor(index/links.length).toString();

    return link;
}

function getEmail(index) {
    return 'tester-' + index.toString() + '@test';
}