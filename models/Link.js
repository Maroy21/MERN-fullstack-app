const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    to: {type: String, required: true, unique: true},
    from: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0},
    owner: {type: Types.ObjectId, ref: 'User'}
})
 
module.exports = model('Link', schema)