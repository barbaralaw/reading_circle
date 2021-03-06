const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookThumbnail: {
    type: String,
    required: false,
  },
  postBody: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', 
    //type: String,
    required: true,
  },
  image: {
    type: String,
    require: false,
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  userName: {
    type: String,
    require: false,
  },
})

module.exports = mongoose.model('Post', PostSchema)
