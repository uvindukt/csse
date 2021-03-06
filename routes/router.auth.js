const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authentication.user");
const User = require('../model/model.user');

const router = express.Router();
router.use(express.json());

const jwtSecret = require("../config/keys").jwtSecret;

/**
 * @route POST api/auth
 * @desc Login user.
 * @access Public.
 */
router.post("/", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ msg: "Please fill all the fields." });

    User
        .findOne({ email })
        .exec()
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch)
                            return res.status(400).send({ msg: "Invalid Credentials." });
                        jwt.sign({ id: user._id }, jwtSecret, (err, token) => {
                            if (err) throw err;
                            user.password = undefined;
                            res.json({ user, token, type: user.type });
                        });
                    })
                    .catch(err => res.status(500).send(err));
            } else {
                res.status(404).send({ msg: "User does not exist." });
            }
        })
        .catch(err => res.status(500).send(err));

});

/**
 * @route GET api/auth
 * @desc Retrieve the owner of a particular token.
 * @access Private
 */
router.get("/", authorize, (req, res) => {

    User
        .findById(req.body.decoded.id)
        .select("-password")
        .then(user => {
            user
                ? res.send({ user })
                : res.status(404).send({ msg: "User does not exist." });
        })
        .catch(err => res.status(500).send(err));

});

module.exports = router;