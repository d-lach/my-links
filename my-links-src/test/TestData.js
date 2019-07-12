export default {
    links: ['bitcoin', 'ethereum', 'monero', 'litecoin', 'ripple'],
    getTarget (link) {
        return 'https://www.google.com/search?q=' + link;
    }
}