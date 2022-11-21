const { User } = require('discord.js')
const mongoose = require('mongoose')
const Members = require('../models/members')

/**
 * 
 * @param {User} user 
 */
exports.confirmAndSaveUser = async (user) => {
    if (user.bot) return;
    try {
        const member = await Members.findOne({id: user.id})
        if (member) {
            member.username = user.username
            member.discriminator = user.discriminator
            member.avatar = user.avatar
            await member.save()
            console.log(`Member (${member.username}) updated successfully.`)
        } else {
            const newMember = new Members({
                _id: new mongoose.Types.ObjectId(),
                id: user.id,
                username: user.username,
                discriminator: user.discriminator,
                avatar: user.avatar
            })
            await newMember.save()
            console.log(`Member (${newMember.username}) added successfully.`)
        }
        return true;
    } catch (error) {
        console.log({message: error.message, error: error})
        return false;
    }
}

exports.getAllMembers = async (req, res) => {
    try {
        const members = await Members.find({}).exec()

        res.status(200).json({message: 'Members fetched successfully.', data: members})
    } catch (error) {
        res.status(500).json({message: error.message, error: error})
    }
}