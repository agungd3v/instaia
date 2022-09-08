const path = require('path')
const fs = require('fs')

const single = (file, exist) => {
    if (exist) fs.unlinkSync(path.join(path.dirname(require.main.filename), '/public/' + exist))

    let valid = false
    const allowType = ['image/jpeg', 'image/png']
    allowType.forEach(mime => file.mimetype == mime ? valid = true : '')
    if (!valid) return { status: false, message: 'format file tidak valid' }

    const fileName = require('crypto').randomBytes(8).toString('hex') + '.jpg'
    const pathDirectory = path.join(path.dirname(require.main.filename), '/public/images/') + fileName
    file.mv(pathDirectory)
    return { status: true, path: '/images/' + fileName }
}

module.exports = { single }