const express = require('express')
const TimeDifference = require('../helpers/time')
const router = express.Router()
const Messages = require('../models/messages')
const Tags = require('../models/tags')


exports.getRawMessages = async (req, res) => {
    const limit = req.query?.limit

    try {
        const messages = await Messages.find({}).sort('-createdAt').exec()
        if (!messages || messages?.length == 0) {
            res.status(200).json({ message: 'No messages yet!', count: 0, data: [] })
            return;
        }

        if (limit > messages?.length) {
            res.status(200).json({ message: 'Request successful.', count: limit, data: messages.slice(0, limit) })
            return;
        }
        res.status(200).json({ message: 'Request successful.', count: messages.length, data: messages })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error?.message ?? 'Something broke', data: error })
    }
}

exports.getMessagesByMonth = async (req, res) => {
    const month = 10;
    const year = 2016;
    const fromDate = new Date(year, month, 1);
    const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
    console.log({fromDate, toDate})

    if (!month && !year) {
        return res.status(400).json({ message: "Query params 'month' and 'year' is required." })
    }

    try {
        const messages = await Messages.find({ createdAt: { '$gte': fromDate, '$lte': toDate } })
        res.status(200).json({ message: 'Messages fetched successfully', data: messages })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error?.message ?? 'Something broke', data: error })
    }
}