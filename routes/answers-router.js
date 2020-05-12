const {Router} = require('express')
const router = Router()
const checkToken = require('../middlewares/checkToken')
const Answer = require('../models/Answer')
const User = require("../models/User")

// api/answers

router.post('/generate', checkToken, async (req, res) => {
    try {
        const answer = await new Answer({text: req.body.text, author: req.user.userId})
        const author = await User.findOne({_id: req.user.userId}).select('email')
        // answer.save()
        console.log(answer)
        delete answer.author
        if (answer) {
            res.status(200).json({answer: {id: answer._id, text: answer.text, date: answer.date}, author})
        }
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

module.exports = router