const {Router} = require('express')
const router = Router()
const checkToken = require('../middlewares/checkToken')
const Question = require('../models/Question')



//api/questions

router.delete('/:id', checkToken, async (req, res) => {
    try {
        let question = await Question.findOne({_id: req.params.id})
        if (!question) res.status(500).json({message: "Что-то пошло не так"})

        const isMatch = question.author == req.user.userId
        if (isMatch) {
            await question.remove()

            res.status(204).json({message: 'Объект удалён'})
        } else {
            res.status(500).json({message: "Что-то пошло не так"})
        }
    }catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

router.post('/generate', checkToken, async (req, res) => {
   try{
       const {title, text} = req.body
       const question = new Question({title, text, author: req.user.userId})
       await question.save()
       res.status(201).json({question})
   }catch (e) {
       res.status(500).json({message: "Что-то пошло не так"})
   }
})

router.get('/', async (req,res) => {
    try {
        let questions = await Question.find({}).populate('author', "email")
        if (questions) {
            questions = questions.map(question => {
                return {title: question.title, text: question.text, id: question._id, date: question.date,
                    author: question.author, answers: question.answers.length, likes: question.likes}
            })
            res.status(200).json({questions})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id
        let question = await Question.findOne({_id: id}).populate("author", "email")
        res.status(200).json(question)
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }

})


module.exports = router