const moongose = require('mongoose')

const authorschema = new moongose.Schema ({
    name: {
        type: String,
        required: true
    }
})

module.exports = moongose.model('Author', authorschema)