import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import {createError} from '../utils/error.js';
import jwt from 'jsonwebtoken';


//register
export const register = async ( req, res, next) => {
    //const { email, password } = req.body;
    try {
        // password encryption function (bcrypt)
        const salt = bcrypt.genSaltSync(10);  //genSaltSync(10) hashing method. if nbr>10 ==> more secure but slower
        const hashedPassword = bcrypt.hashSync(req.body.password, salt); //"req.body.password" the password entred by user 

        const newUser = new User({ 
            //before admin panel is created, we can add the fields manually
            // username: req.body.username,   //"req.body.username" the username entred by user
            // email: req.body.email,          //"req.body.email" the email entred by user
           
            ...req.body,                   //this will add all the fields in req.body to the new user
            password: hashedPassword      //"hashedPassword" encrypted password
        });
       
        await newUser.save();
        res.status(201).send('User created successfully');
        console.log(' User',"'", req.body.username ,"'",'has been created successfully');
    } catch (error) {
        next(error);
    }
}


//login
export const login = async ( req, res, next) => {
    //const { email, password } = req.body;
    try {
        //check if user exists
        const user = await User.findOne({ username: req.body.username})
        if(!user) return next(createError(404, 'User not found'));
       //else 
        console.log(" user: '",req.body.username,"' has been logged in");
        
        //check if password is not correct 
        //by comparing the password entred by user with the hashed password in DB
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,      //the password entred by user
            user.password           //he hashed password in DB
            );
        if(!isPasswordCorrect) return next(createError(401, 'Wrong password or username'));

        //hash user id and isAdmin (JWT_SECRET) and send user information as cookies (hide it in token)
         const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET
            );
           
        //prevent password ,isAdmin and other details from showing when client is logged in
        const { password, isAdmin, ...otherDetails } = user._doc;

        //else
        res.cookie("access_token",token,{
            httpOnly: true ,    //for security: not allow any client secret to be accessed by the browser
         }).status(200).json ({details:{ ...otherDetails}, isAdmin });
            
            
    } catch (error) {
        next(error);
    }
}