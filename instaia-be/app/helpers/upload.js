const path = require('path')
const fs = require('fs')
const sharp = require('sharp')

const remove = (pathExist) => {
    fs.unlinkSync(path.join(path.dirname(require.main.filename), '/public/' + pathExist))
    return true
}

const uploadPublicPath = async (file, width, height, destination, exist) => {
    try {
        const allowType = ['image/jpeg', 'image/png']
        if (!allowType.find(type => type === file.mimetype)) throw 'File type not support'

        const naming = require('crypto').randomBytes(8).toString('hex') + '.jpg'
        const pathDirectory = path.join(path.dirname(require.main.filename), '/public/images/' + destination + '/') + naming
        await sharp(file.data).resize(width, height).toFile(pathDirectory)

        if (exist) fs.unlinkSync(path.join(path.dirname(require.main.filename), '/public/' + exist))
        return { status: true, path: '/images/' + destination + '/' + naming }
    } catch (error) {
        return { status: false, message: error }
    }
}

module.exports = { remove, uploadPublicPath }