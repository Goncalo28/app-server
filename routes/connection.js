const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Connection = require("../models/Connection");
const passport = require('passport');

router.get("/connections/user", (req, res) => {
  let userID = req.user._id
  console.log(userID)
  Connection.find({ $or: [{ from: userID }, { to: userID }] })
    .then((connections) => {
      res.json(connections)
    })
})

router.post('/connections', (req, res) => {
  let from = req.user._id;
  let { to } = req.body
  Connection.create({ from, to })
    .then((connection) => {
      res.json(connection)
    })
})

router.delete("/connections/:id", (req, res) => {
  let id = req.params.id;
  Connection.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "Connection was deleted" })
    })
})


// router.get("/connections/:id", (req, res) => {
//   let id = req.params.id;
//   Connection.findById(id)
//     .then((connection) => {
//       res.json(connection)
//     })
// })

module.exports = router;
