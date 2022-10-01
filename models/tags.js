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

        createdAt: {
            type: Date,
            default: new Date()
        },

        tagged: {
            type: String,
            ref: 'User',
        },

        hasReplied: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)


module.exports = mongoose.model('Tags', TagsSchema)