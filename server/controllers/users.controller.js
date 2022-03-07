const Users = require('../models/users.model.js');

// get user depending on request
const getUsersController = async (req, res) => {

    if(res.fullName) {
        try {
            const requestedUser = await Users.find({ name: res.fullName });
            return res.json(requestedUser);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } 
        
    try {
        const firstUser = await Users.findOne();
        return res.json(firstUser);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// create a single user
const createUsersController = async (req, res) => {
    try {
        const newUser = await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// update a single user
const updateUserController = async (req, res) => {
    try {
        const updatedUser = await Users.findOneAndUpdate(
            { name: res.fullName }, 
            { name: req.body.name }, 
            { new: true }
        );
        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// deletes a single user
const deleteUserController = async (req, res) => {
    try {
        await Users.findOneAndDelete({ name: res.fullName });
        res.status(200).json({ message: `Succesfully deleted user ${res.fullName}` });
    } catch (error) {
        res.status(400).json({ message: `User ${res.fullName} was not found` });
    }
}

module.exports = { 
    getUsersController, 
    createUsersController, 
    updateUserController,
    deleteUserController
}