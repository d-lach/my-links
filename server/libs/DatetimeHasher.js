const hashids = new (require('hashids'))();

export default function() {
    return hashids.encode(Date.now());
}