const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    text : {type: String},
    author: {type: Types.ObjectId, ref: "User"},
    date: {type: Date, default: Date.now},
    question: {type: Types.ObjectId, ref: "Question"},
    likes: {type: Number, default: 0}
})

module.exports = model('Answer', schema)