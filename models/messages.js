const mongoose = require('mongoose')


const MessagesSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,

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

        content: String,

        createdAt: {
            type: Date,
            default: new Date()
        },

        mentions: [
            {
                type: String,
                ref: 'User'
            }
        ],

        issueAuthor: String,
        issueId: String,
        issueContent: String,

        issueCreatedAt: {
            type: Date,
            default: new Date()
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