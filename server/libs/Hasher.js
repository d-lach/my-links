const bcrypt = require('bcrypt');

export default function hash (string) {
    return bcrypt.hash(string, 10)
}
