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

        mentions: [
            {
                type: String,
                ref: 'User'
            }
        ],

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
        ]
    },
    { timestamps: true }
)


module.exports = mongoose.model('Messages', MessagesSchema)