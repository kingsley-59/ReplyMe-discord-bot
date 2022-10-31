const express = require('express')
const router = express.Router()
const Messages = require('../models/messages')
const Tags = require('../models/tags')


router.get('/test', async (req, res) => {
    res.status(200).json({message: 'This is a route'})
})

router.get('/raw/messages', async (req, res) => {
    const limit = req.query?.limit

    try {
        const messages = await Messages.find({}).sort('-createdAt').exec()
        if (!messages || messages?.length == 0) {
            res.status(200).json({message: 'No messages yet!', count: 0, data: []})
            return;
        }

        if (limit > messages?.length) {
            res.status(200).json({message: 'Request successful.', count: limit, data: messages.slice(0, limit)})
            return;
        }
        res.status(200).json({message: 'Request successful.', count: messages.length, data: messages})
    } catch (error) {
        console.log(error?.message)
        res.status(500).json({message: 'Something broke', data: error})
    }
})

router.get('/raw/tags', async (req, res) => {
    const limit = req.query?.limit

    try {
        const tags = await Tags.find({}).sort('-createdAt').exec()
        if (!tags || tags?.length == 0) {
            res.status(200).json({message: 'No messages yet!',count: 0, data: []})
            return;
        }
        const responded = tags.filter((tag) => tag.hasReplied).length
        const unresponded = tags.length - responded

        if (limit > tags?.length) {
            let count = limit
            res.status(200).json({message: 'Request successful.', count, responded, unresponded, data: tags.slice(0, limit)})
            return;
        }
        res.status(200).json({message: 'Request successful.', count: tags.length, responded, unresponded, data: tags})
    } catch (error) {
        console.log(error?.message)
        res.status(500).json({message: 'Something broke', data: error})
    }
})


// ratio of responded to unresponded


// weighted average for message response


// user stats summary on response time


module.exports = router