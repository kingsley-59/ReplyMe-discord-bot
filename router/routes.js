const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')
const tagController = require('../controllers/tagController')
const memberController = require('../controllers/memberController')


router.get('/test', async (req, res) => {
    res.status(200).json({message: 'This is a route'})
})

router.get('/users', memberController.getAllMembers)

router.get('/messages/sort', messageController.getMessagesByMonth)

router.get('/raw/messages', messageController.getRawMessages)

router.get('/raw/tags', tagController.getRawTags)


// ratio of responded to unresponded


// weighted average for message response


// user stats summary on response time


module.exports = router