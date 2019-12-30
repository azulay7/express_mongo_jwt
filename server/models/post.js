const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    postDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    postContent:{
        type: String
    }
})

module.exports = mongoose.model('Post',postSchema);