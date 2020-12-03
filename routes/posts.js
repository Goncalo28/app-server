const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");
const passport = require('passport');

router.get('/posts', (req, res) => {
  Post.find()
    .then((posts) => {
      res.json(posts)
    })
});

router.post('/posts', (req, res) => {
  let userID = req.user._id
  let { content } = req.body
  Post.create({ content, user: userID })
    .then((post) => {
      res.json(post)
    })
})

router.put('/posts/:id', (req, res) => {
  let id = req.params.id
  let newContent = req.body
  Post.findByIdAndUpdate(id, newContent, { new: true })
    .then((post) => {
      console.log(post)
      res.json(post)
    })
})

router.get('/posts/:id', (req, res) => {
  let id = req.params.id
  Post.findById(id)
    .then((post) => {
      res.json(post)
    })
});

router.delete('/posts/delete/:id', (req, res) => {
  let id = req.params.id
  Post.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: 'Post deleted successfully' })
    })
})

router.get('/posts/owner/:id', (req, res) => {
  let id = req.params.id
  Post.find({ user: id })
    .then((posts) => {
      res.json(posts)
    })
})

module.exports = router;
