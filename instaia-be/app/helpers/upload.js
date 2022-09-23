const path = require('path')
const fs = require('fs')
const sharp = require('sharp')

const single = (file, destination, exist) => {
    if (exist) fs.unlinkSync(path.join(path.dirname(require.main.filename), '/public/' + exist))

    let valid = false
    const allowType = ['image/jpeg', 'image/png']
    allowType.forEach(mime => file.mimetype == mime ? valid = true : '')
    if (!valid) return { status: false, message: 'format file tidak valid' }

    const fileName = require('crypto').randomBytes(8).toString('hex') + '.jpg'
    const pathDirectory = path.join(path.dirname(require.main.filename), '/public/images/' + destination + '/') + fileName
    file.mv(pathDirectory)
    return { status: true, path: '/images/' + destination + '/' + fileName }
}

const remove = (pathExist) => {
    fs.unlinkSync(path.join(path.dirname(require.main.filename), '/public/' + pathExist))
    return true
}

const uploadAvatar = async (file, exist) => {
    try {
        if (exist) fs.unlinkSync(path.join(path.dirname(require.main.filename), '/public/' + exist))
    
        let valid = false
        const allowType = ['image/jpeg', 'image/png']
        allowType.forEach(mime => file.mimetype == mime ? valid = true : '')
        if (!valid) throw 'format file tidak valid'
    
        const naming = require('crypto').randomBytes(8).toString('hex') + '.jpg'
        const pathDirectory = path.join(path.dirname(require.main.filename), '/public/images/avatars/') + naming
        await sharp(file.data).resize(300, 300).toFile(pathDirectory)

        return { status: true, path: '/images/avatars/' + naming }
    } catch (error) {
        return { status: false, message: error }
    }
}

module.exports = { single, uploadAvatar, remove }