const User = require('../model/model.user');
const bcrypt = require("bcryptjs");
const genPass = require("generate-password");
const MailService = require("../service/service.mail");

class UserController {

    /**
     * Creates a new User.
     * @param data
     * @returns {Promise<JSON>}
     */
    static createUser(data) {

        return new Promise((async (resolve, reject) => {

            try {

                let user = new User(data);
                let password = await genPass.generate({length: 4});

                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);

                const optionalUser = await User.findOne({email: user.email});

                if (optionalUser) {

                    reject({status: 400, msg: "User already exists."});

                } else {

                    const savedUser = await user.save();
                    MailService.sendMail(savedUser.email, "Procurement System", MailService.getUserCreatedMessage(savedUser, password, savedUser.type));
                    resolve({status: 200, msg: "User created successfully.", user: savedUser});

                }

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err})

            }

        }));

    }

    /**
     * Retrieves all Users.
     * @returns {Promise<JSON>}
     */
    static getAllUsers() {

        return new Promise(async (resolve, reject) => {

            try {

                let users = await User.find().select('-password');
                resolve(users);

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err})

            }

        })

    }

    /**
     * Retrieves a user by email.
     * @param email
     * @returns {Promise<JSON>}
     */
    static getUserByEmail(email) {

        return new Promise(async (resolve, reject) => {

            try {

                let user = await User.findOne({email: email}).select('-password');
                user
                    ? resolve(user)
                    : reject({status: 401, msg: "Could not find the specified user."})

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err})

            }

        })

    }

    /**
     * Retrieves a user by ID.
     * @param id
     * @returns {Promise<JSON>}
     */
    static getUserById(id) {

        return new Promise(async (resolve, reject) => {

            try {

                let user = await User.findById(id).select('-password');
                user
                    ? resolve(user)
                    : reject({status: 401, msg: "Could not find the specified user."})

            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err})

            }

        })

    }

    /**
     * Updates a user by email.
     * @param email
     * @param data
     * @returns {Promise<JSON>}
     */
    static updateUserByEmail(email, data) {

        return new Promise(async (resolve, reject) => {

            try {

                const user = await User.findOne({email: email});

                if (user) {

                    const updatedUser = await User.findByIdAndUpdate(user._id, data, {new: true});
                    resolve({status: 200, success: 'User updated.', user: updatedUser});

                } else {

                    resolve({status: 200, msg: 'Could not find specified user.'});

                }


            } catch (err) {

                reject({status: 500, msg: "Something went wrong.", err})

            }

        })

    }

}

module.exports = UserController;