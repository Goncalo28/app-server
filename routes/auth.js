const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const passport = require("passport")

router.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.status(400).json({ message: "Provide username and password" });
        return;
    }
    User.findOne({ username }, (err, foundUser) => {
        if (err) {
            res.status(500).json({ message: "Username check went bad." });
            return;
        }
        if (foundUser) {
            res.status(400).json({
                message: "Username taken. Choose another one.",
            });
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const aNewUser = new User({
            username: username,
            password: hashPass,
        });
        aNewUser.save((err) => {
            if (err) {
                res.status(400).json({
                    message: "Saving user to database went wrong.",
                });
                return;
            }
            res.json(aNewUser);
        });
    });
});

module.exports = router;
