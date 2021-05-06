const Post = require('../models/Post')

module.exports = {
    getPostPage: async (req,res)=>{
        try{
            const post = await Post.findById(req.params.id)
            res.render('post.ejs', {post: post, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    likePost:  async (req, res) => {
        try {
          await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { likes: 1 },
            }
          );
          console.log("Likes +1");
          res.redirect(`/postPage/${req.params.id}`);
        } catch (err) {
          console.log(err);
        }
      },
    dislikePost:  async (req, res) => {
        try {
          await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { dislikes: 1 },
            }
          );
          console.log("Likes +1");
          res.redirect(`/postPage/${req.params.id}`);
        } catch (err) {
          console.log(err);
        }
      }
}