const express = require("express");
const router = express.Router();
const postPageController = require("../controllers/postPage");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, postPageController.getPostPage);

router.put("/likePost/:id", postPageController.likePost)

router.put("/dislikePost/:id", postPageController.dislikePost)

module.exports = router;