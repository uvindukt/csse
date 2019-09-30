const express = require('express');
const ItemController = require('../controller/controller.item');
const router = express.Router();

/**
 * @route POST /api/item
 * @desc Create item.
 * @access Private.
 */
router.post('/', (req, res) => {
    ItemController
        .addItem(req.body)
        .then(result => res.json(result))
        .catch(err => err.status ? res.status(err.status).json(err) : res.json(err));
});

/**
 * @route GET /api/item
 * @desc Get all items.
 * @access Private.
 */
router.get('/', (req, res) => {
    ItemController
        .getAll()
        .then(result => res.json(result))
        .catch(err => err.status ? res.status(err.status).json(err) : res.json(err));
});

/**
 * @route GET /api/item
 * @desc Get item by id.
 * @access Private.
 */
router.get('/', (req, res) => {
    ItemController
        .getById(req.body.id)
        .then(result => res.json(result))
        .catch(err => err.status ? res.status(err.status).json(err) : res.json(err));
});

/**
 * @route GET /api/item
 * @desc Get item by name.
 * @access Private.
 */
router.get('/', (req, res) => {
    ItemController
        .getByName(req.body.name)
        .then(result => res.json(result))
        .catch(err => err.status ? res.status(err.status).json(err) : res.json(err));
});

/**
 * @route PUT /api/item
 * @desc Increment item quantity.
 * @access Private.
 */
router.put('/increment', (req, res) => {
    ItemController
        .increment(req.body.id, req.body.quantity)
        .then(result => res.json(result))
        .catch(err => err.status ? res.status(err.status).json(err) : res.json(err));
});

/**
 * @route PUT /api/item
 * @desc Decrement item quantity.
 * @access Private.
 */
router.put('/decrement', (req, res) => {
    ItemController
        .decrement(req.body.id, req.body.quantity)
        .then(result => res.json(result))
        .catch(err => err.status ? res.status(err.status).json(err) : res.json(err));
});

module.exports = router;