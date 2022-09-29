const mongoose = require('mongoose')


const UserSchema = mongoose.Schema(
    {
        _id: String,

        id: String,

        username: String,

        discriminator: String
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)