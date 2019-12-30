const express = require("express");
const router = express.Router();
const Post = require("../models/post");

//Get all
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get One
router.get("/:id", getPostById, async (req, res) => {
  res.send(res.post);
});

//Create One
router.post("/", async (req, res) => {
  const post = new Post({
    name: req.body.name,
    postContent: req.body.postContent
  });

  try {
    const newPost = await post.save();
    res.status(201).send(newPost);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//Update One
router.patch("/:id", getPostById, async (req, res) => {
  if (req.body.name) {
    res.post.name = req.body.name;
  }
  if (req.body.postContent) {
    res.post.postContent = req.body.postContent;
  }
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete One
router.delete("/:id", getPostById, async (req, res) => {
  try {
    await res.post.remove();
    res.status(200).json({ message: "post has deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getPostById(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res
        .status(404)
        .json({ message: "cannot find post by this id " + req.params.id });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.post = post;
  next();
}

module.exports = router;
