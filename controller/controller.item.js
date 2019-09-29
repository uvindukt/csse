const Item = require('../model/model.item');

class ItemController {

    /**
     * Creates a new Item.
     * @param data
     * @returns {Promise<JSON>}
     */
    static addItem(data) {

        return new Promise(async (resolve, reject) => {

            let item = new Item(data);

            try {

                const savedItem = await item.save();
                resolve({status: 200, msg: 'Item added.', item: savedItem});

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err});

            }

        })

    }

    /**
     * Retrieves all items.
     * @returns {Promise<JSON>}
     */
    static getAll() {

        return new Promise(async (resolve, reject) => {

            try {

                const items = await Item.find();
                resolve({status: 200, items});

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err});

            }

        })

    }

    /**
     * Retrieves an item by name.
     * @param name
     * @returns {Promise<JSON>}
     */
    static getByName(name) {

        return new Promise(async (resolve, reject) => {

            try {

                const item = await Item.findOne({name: name});
                resolve({status: 200, item});

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err});

            }

        })

    }

    /**
     * Retrieves an item by id.
     * @param id
     * @returns {Promise<JSON>}
     */
    static getById(id) {

        return new Promise(async (resolve, reject) => {

            try {

                const item = await Item.findById(id);
                resolve({status: 200, item});

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err});

            }

        })

    }

    /**
     * Increment item quantity.
     * @param id
     * @param amount
     * @returns {Promise<JSON>}
     */
    static increment(id, amount) {

        return new Promise(async (resolve, reject) => {

            try {

                let item = await Item.findById(id);
                item.quantity = await item.quantity + amount;
                const updatedItem = await Item.findByIdAndUpdate(id, item);
                resolve({status: 200, item});

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err});

            }

        })

    }

    /**
     * Decrement item quantity.
     * @param id
     * @param amount
     * @returns {Promise<JSON>}
     */
    static decrement(id, amount) {

        return new Promise(async (resolve, reject) => {

            try {

                let item = await Item.findById(id);

                if (item.quantity >= amount) {

                    item.quantity = await item.quantity - amount;
                    const updatedItem = await Item.findByIdAndUpdate(id, item);
                    resolve({status: 200, updatedItem});

                } else {

                    resolve({status: 400, msg: 'Required amount should be less than quantity.'})

                }

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err});

            }

        })

    }

}

module.exports = ItemController;