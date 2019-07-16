const links = ['bitcoin', 'ethereum', 'monero', 'litecoin', 'ripple'];

function getTarget(link) {
    return 'https://www.google.com/search?q=' + link;
}

export default (function* generator () {
    for (let i = 0; true; i = (++i) % links.length)
        yield {
            link: links[i],
            target: getTarget(links[i])
        };
})();
