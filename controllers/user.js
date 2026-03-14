import User from "../models/User.js";


//create user is done in auth.js (register function)


//UPDATE
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body},
            {new: true}  //to return the updated not the original
        );
        res.status(200).json(updatedUser);
        console.log("\u001b[1;33m user id=",req.params.id ,"has been updated. \u001b[1;33m "); //yellow color: \u001b[1;33m  (at the begin and end of message)
    } catch (err) {
        next(err);
        console.log("\u001b[1;31m the user id you wish to update, don't exist. \u001b[1;31m");  //red color: \u001b[1;31m  (at the begin and end of message)

    }
};


//DELETE
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
        console.log("\u001b[1;33m 'user has been deleted.' \u001b[1;33m"); 
    } catch (err) {
        next(err);
        console.log("\u001b[1;31m the user id you wish to delete don't exist \u001b[1;31m");  
    }
};

//GET ONE
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
        console.log("\u001b[1;31m the user id you're looking for, don't exist. \u001b[1;31m");  

    }
};

//GET ALL
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

