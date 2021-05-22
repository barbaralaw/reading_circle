searchWorld: async (req, res) => {
  console.log(req.file);

  const result = await cloudinary.uploader.upload(req.file.path);

  try {
    await Post.create({
      bookTitle: req.body.bookTitle,
      bookAuthor: req.body.bookAuthor,
      bookThumbnail: req.body.bookThumbnail,
    });
    console.log("Post has been added!");
    res.redirect("/post");
  } catch (err) {
    console.log(err);
  }
},
