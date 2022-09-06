const response = (response, result, code = 200) => {
    const rcode = 500 || 403 || 401 || 400
    return response.status(code).json({
        status: code === rcode ? false : true,
        message: code === rcode ? result : null,
        data: code === 200 ? result : null
    })
}

module.exports = { response }