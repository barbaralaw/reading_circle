const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  postBody:{
    type: String,
    required: true,
  }
  ,
  likes: {
    type: Number,
    required: false,
    default:0
  },
  dislikes: {
    type: Number,
    required: false,
    default:0
  },
  userId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('Post', PostSchema)
