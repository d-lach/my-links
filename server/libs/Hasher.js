const bcrypt = require('bcrypt');

export function hash (string) {
    return bcrypt.hash(string, 10)
}

export function check(explicit, hash) {
    return bcrypt.compareSync(explicit, hash)
}