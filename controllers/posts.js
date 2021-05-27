const Post = require("../models/Post");
const path = require("path");
const cloudinary = require("../middleware/cloudinary")

module.exports = {
  getProfile: async (req, res) => {
    // console.log(req.user)
    try {
      const postItems = await Post.find({ userId: req.user.id });
      // const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
      res.render("dashboard.ejs", { post: postItems, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    console.log(req.file);
    console.log('body is: ', req.body)
    console.log(JSON.parse(req.body.foundBook))
    let foundBook = JSON.parse(req.body.foundBook)
    let author = foundBook.authors
    if (!author || author.length == 0) {
      author = 'unknown'
    } else {
      author = author.join(', ')
    }
    const fileErrors = [];
    var result = 'https://res.cloudinary.com/readalong/image/upload/v1622151204/No_Image_Selected_gpzpa2.jpg'
    if (req.file) {
      if (req.file.size > 1024 * 1024 * 3)
        fileErrors.push({ msg: "Uploaded file is larger than 3 MB" });

      if (
        !(
          /jpeg|jpg|png|gif/.test(
            path.extname(req.file.originalname).toLowerCase()
          ) && /jpeg|jpg|png|gif/.test(req.file.mimetype)
        )
      )
        fileErrors.push({ msg: "Only jpeg, jpg, png and gif allowed" });


      result = await cloudinary.uploader.upload(req.file.path);
    }



    if (fileErrors.length) {
      req.flash("errors", fileErrors);
      return res.redirect("/login");
    }



    try {
      await Post.create({
        image: result.secure_url,
        cloudinaryId: result.public_id,
        post: req.body.post,
        bookTitle: foundBook.title,
        bookAuthor: author,
        bookThumbnail: foundBook.thumbnail,
        postBody: req.body.postBody,
        userName: req.user.firstNameChild,
        userId: req.user.id,

      });
      console.log("Post has been added!");
      res.redirect("/post");
    } catch (err) {
      console.log(err);
    }
  },
  // markComplete: async (req, res)=>{
  //     try{
  //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
  //             completed: true
  //         })
  //         console.log('Marked Complete')
  //         res.json('Marked Complete')
  //     }catch(err){
  //         console.log(err)
  //     }
  // },
  // markIncomplete: async (req, res)=>{
  //     try{
  //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
  //             completed: false
  //         })
  //         console.log('Marked Incomplete')
  //         res.json('Marked Incomplete')
  //     }catch(err){
  //         console.log(err)
  //     }
  // },
  // deletePost: async (req, res)=>{
  //     // console.log(req.body.postIdFromJSFile)
  //     try{
  //         await Post.findOneAndDelete({_id:req.body.postIdFromJSFile})
  //         console.log('Deleted Todo')
  //         res.json('Deleted It')
  //     }catch(err){
  //         console.log(err)
  //     }
  // }

  deletePost: async (req, res) => {
    try {
      // await Post.findOneAndDelete({_id:req.body.postIdFromJSFile})
      // Find post by id
      let post = await Post.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/post");
      // res.json('Deleted It')
    } catch (err) {
      console.log(err);
    }
  },
};
