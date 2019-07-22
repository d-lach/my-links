const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {type: String, unique: true, required: true},
    hash: {type: String, required: true},
    createdDate: {type: Date, default: Date.now},

    permissions: {type: Number, default: 1},

    links: [{type: Schema.Types.ObjectId, ref: 'Link'}],
});

export default () => mongoose.model('User', schema);