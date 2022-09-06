const bcrypt = require('bcrypt')
const saltLength = 10

const make = async (str) => {
    const salt = await bcrypt.genSalt(saltLength)
    const hash = await bcrypt.hash(str, salt)
    return hash
}

const verify = async (str, hash) => {
    const compare = await bcrypt.compare(str, hash)
    return compare
}

module.exports = { make, verify }