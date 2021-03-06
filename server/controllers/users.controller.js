const Users = require('../models/users.model.js');

// get all users
const getAllUsersController = async (req, res) => {
    try {
        const users = await Users.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404).json({ message: 'Could Not Load Users From Database' });
    }
}

// find and sort users depending on get params from FilterOptions component
const getUsersController = async (req, res) => {
    const filterValue = req.query.filter;
    try {
        if(filterValue === 'none') {
            const nonFilteredUsers = await Users.find();
            return res.status(200).json(nonFilteredUsers);
        } else if(filterValue.includes('ascending')) {
            const incFilteredUsers = await Users.find().sort({ [filterValue.split('_')[0]]: 1 });
            return res.status(200).json(incFilteredUsers);
        } else {
            const decFilteredUsers = await Users.find().sort({ [filterValue.split('_')[0]]: -1 });
            return res.status(200).json(decFilteredUsers);
        }
    } catch(error) {
        return res.status(400).json({ message: 'Could Not Complete Request' });
    }
}

// create a single user
const createUsersController = async (req, res) => {
    try {
        const newUser = await Users.create({
            name: res.fullName,
            email: req.body.email,
            birthday: req.body.birthday,
            favMovie: req.body.favMovie,
            favFood: req.body.favFood,
            favColor: req.body.favColor,
            favHobby: req.body.favHobby,
            relationship: req.body.relationship
        });
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// update a single user
const updateUserController = async (req, res) => {
    try {
        const updatedUser = await Users.findOneAndUpdate(
            { _id: req.params.id }, 
            { ...req.body, name: res.fullName },
            { new: true }
        );
        return res.status(201).json(updatedUser);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// deletes a single user
const deleteUserController = async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id });
        await user.remove();
        return res.status(200).json({ message: `Succesfully deleted user` });
    } catch (error) {
        return res.status(404).json({ message: `User was not found` });
    }
}

module.exports = {
    getAllUsersController,
    getUsersController, 
    createUsersController, 
    updateUserController,
    deleteUserController
}