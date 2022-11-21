const mongoose = require('mongoose')


const UserSchema = mongoose.Schema(
    {
        _id: String,

        id: String,

        username: String,

        discriminator: String,

        avatar: String | null
    },
    { timestamps: true }
)

module.exports = mongoose.model('Members', UserSchema)