const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now},
    likes: {type: Number, default: 0},
    answers: [{
        type: Types.ObjectId,
        ref: "Answer"
    }],
    author: {type: Types.ObjectId, ref: "User"}
})

module.exports = model('Question', schema)