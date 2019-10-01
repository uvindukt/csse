const Order = require('../model/model.order');

class OrderController {

    /**
     * Creates a new Order.
     * @param data
     * @returns {Promise<JSON>}
     */
    static addOrder(data) {

        return new Promise(async (resolve, reject) => {

            let order = new Order(data);

            try {

                const savedOrder = await order.save();
                resolve({status: 200, msg: 'Order added.', order: savedOrder});

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err});

            }

        })

    }

    /**
     * Retrieves all orders.
     * @returns {Promise<JSON>}
     */
    static getAll() {

        return new Promise(async (resolve, reject) => {

            try {

                const orders = await Order.find();
                resolve({status: 200, orders});

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err});

            }

        })

    }

    /**
     * Retrieves orders by status.
     * @param status
     * @returns {Promise<JSON>}
     */
    static getByStatus(status) {

        return new Promise(async (resolve, reject) => {

            try {

                const orders = await Order.find({status: status});
                resolve({status: 200, orders});

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err});

            }

        })

    }

    /**
     * Retrieves an order by id.
     * @param id
     * @returns {Promise<JSON>}
     */
    static getById(id) {

        return new Promise(async (resolve, reject) => {

            try {

                const order = await Order.findById(id);
                resolve({status: 200, order});

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err});

            }

        })

    }

    /**
     * Updates an existing order if it is not approved yet.
     * @param id
     * @param data
     * @returns {Promise<JSON>}
     */
    static updateOrder(id, data) {

        return new Promise(async (resolve, reject) => {

            try {

                const order = Order.findById(id);

                if (order.status !== 'APPROVED') {

                    data.date = await Date.now();
                    const updatedOrder = await Order.findByIdAndUpdate(id, data, {new: true});
                    resolve({status: 200, order: updatedOrder, msg: 'Order updated.'});

                } else {

                    resolve({status: 200, msg: 'Order is already approved.'});

                }


            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err});

            }

        })

    }

    /**
     * Deletes an existing order if it is not approved yet.
     * @param id
     * @returns {Promise<JSON>}
     */
    static  removeOrder(id) {

        return new Promise(async (resolve, reject) => {

            try {

                const order = Order.findById(id);

                if (order.status !== 'APPROVED') {

                    const deletedOrder = await Order.findByIdAndRemove(id);
                    resolve({status: 200, order: deletedOrder, msg: 'Order deleted.'});

                } else {

                    resolve({status: 200, msg: 'Order is already approved.'});

                }

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err});

            }

        })

    }

}

module.exports = OrderController;