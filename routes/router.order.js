const express = require('express');
const OrderController = require('../controller/controller.order');
const router = express.Router();

/**
 * @route POST /api/order
 * @desc Create order.
 * @access Private.
 */
router.post('/', (req, res) => {

    OrderController
        .addOrder(req.body)
        .then(result => res.json(result))
        .catch(err => err.status ? res.status(err.status).json(err) : res.json(err));

});

/**
 * @route GET /api/order
 * @desc Get all orders.
 * @access Private.
 */
router.get('/', (req, res) => {

    OrderController
        .getAll()
        .then(result => res.json(result))
        .catch(err => err.status ? res.status(err.status).json(err) : res.json(err));

});

/**
 * @route GET /api/order
 * @desc Get orders by status.
 * @access Private.
 */
router.get('/status', (req, res) => {

    OrderController
        .getByStatus(req.body.status)
        .then(result => res.json(result))
        .catch(err => err.status ? res.status(err.status).json(err) : res.json(err));

});

/**
 * @route GET /api/order
 * @desc Get order by ID.
 * @access Private.
 */
router.get('/id', (req, res) => {

    OrderController
        .getById(req.body.id)
        .then(result => res.json(result))
        .catch(err => err.status ? res.status(err.status).json(err) : res.json(err));

});

/**
 * @route PUT /api/order
 * @desc Updates an existing order if it is not approved yet.
 * @access Private.
 */
router.put('/', (req, res) => {

    OrderController
        .updateOrder(req.body.id, req.body.order)
        .then(result => res.json(result))
        .catch(err => err.status ? res.status(err.status).json(err) : res.json(err));

});

/**
 * @route DELETE /api/order
 * @desc Deletes an existing order if it is not approved yet.
 * @access Private.
 */
router.delete('/', (req, res) => {

    OrderController
        .removeOrder(req.body.id)
        .then(result => res.json(result))
        .catch(err => err.status ? res.status(err.status).json(err) : res.json(err));

});

module.exports = router;