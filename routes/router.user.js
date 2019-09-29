const express = require('express');
const UserController = require('../controller/controller.user');
const authorize = require('../middleware/authentication.user');
const validate = require('../middleware/validation');
const router = express.Router();

/**
 * @route POST /api/user
 * @desc Create user.
 * @access Private.
 */
router.post('/', authorize, validate, (req, res) => {
    UserController
        .createUser(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err));
});

/**
 * @route GET /api/user
 * @desc Retrieves all users.
 * @access Private.
 */
router.get('/', authorize, (req, res) => {
    UserController
        .getAllUsers()
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err));
});

module.exports = router;