const { response } = require('../helpers/response')

module.exports = {
    getPosts: async (req, res) => {
        return response(res, req.user)
    }
}