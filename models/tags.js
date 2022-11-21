const mongoose = require('mongoose')


const TagsSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            // default: new mongoose.Types.ObjectId()
        },

        messageId: {
            type: String,
            required: true
        },

        author: {
            type: String,
            ref: 'User',
            required: true
        },

        fullname: String,

        content: String,

        createdAt: {
            type: Date,
        },

        tagged: {
            type: String,
            ref: 'User',
        },

        taggedUserFullname: String,

        hasReplied: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)


module.exports = mongoose.model('Tags', TagsSchema)