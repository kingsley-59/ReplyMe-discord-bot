const mongoose = require('mongoose')


const MessagesSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: new mongoose.Types.ObjectId()
        },

        messageId: {
            type: String,
            required: true,
            unique: true
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

        mentions: [Object],

        issueAuthor: String,
        issuerFullname: String,
        issueId: String,
        issueContent: String,

        issueCreatedAt: {
            type: Date,
        },

        issueMentions: [
            {
                type: String,
                ref: 'User'
            }
        ],

        delay: String,

        delayInMillis: Number,
    },
    { timestamps: true }
)


module.exports = mongoose.model('Messages', MessagesSchema)