const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const passport = require('passport')

router.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users)
    })
})

router.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  User.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "User was deleted" })
    })
})

router.put("/users/:id", (req, res) => {
  let id = req.params.id
  let user = req.body;
  User.findByIdAndUpdate(id, user, { new: true })
    .then((user) => {
      res.json(user);
    })
})

router.get("/users/:id", (req, res) => {
  let id = req.params.id;
  console.log(`${id} from user.js `)
  console.log(`user in session ${req.user}`)
  User.findById(id)
    .then((user) => {
      res.json(user)
    })
})

module.exports = router;
