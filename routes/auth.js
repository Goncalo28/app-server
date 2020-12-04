const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport")

router.post("/signup", (req, res) => {
    const { username, password, email, typeOfUser, firstName, lastName } = req.body

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
            username,
            password: hashPass,
            firstName,
            lastName,
            email,
            typeOfUser
        });
        aNewUser.save((err) => {
            if (err) {
                res.status(400).json({
                    message: "Saving user to database went wrong.",
                });
                return;
            }
            req.login(aNewUser, (err) => {
                if (err) {
                    res.status(500).json({ message: "Session save went bad." });
                    return;
                }
                // We are now logged in (that's why we can also send req.user)
                res.status(200).json(aNewUser);
            });
        });
    });
});

router.post("/login", (req, res) => {
    passport.authenticate("local", (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({
                message: "Something went wrong authenticating user",
            });
            return;
        }
        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }
        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: "Session save went bad." });
                return;
            }
            console.log(req.user)
            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser);
        });
    })(req, res);
});

router.post("/logout", (req, res) => {
    req.logout();
    res.status(200).json(({ message: "Log out success" }))
})

router.get("/loggedin", (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user)
        return;
    }
    res.json({})
})

module.exports = router;
