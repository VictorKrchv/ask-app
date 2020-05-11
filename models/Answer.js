const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    text : {type: String},
    question: {type: Types.ObjectId, ref: "Question"},
    likes_count: {type: Number, default: 0}
})

module.exports = model('Answer', schema)