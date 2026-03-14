import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';


/*verify authentification (Token validity besed on cookies)
token (in cookies) === JWT_SECRET + user info (id, isAdmin) */
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;  //get token from cookies
  //if ther is no token
  if (!token) {
    return next(createError(401, 'you are not authentificated'));
  }
  //else if there is a token ==> verify it:
  //by comparing JWT_SECRET with the token from cookies
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //if there is an error
    if (err) return next(createError(403, 'Token is not valid'));
    //else if true
    req.user = user;
    next();  //next operation
  });
};

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


//only user himself and admin can make changes to the user account (update/delete account)
export const verifyUser = (req, res, next) => { 
    verifyToken(req, res, next, () => {
        //only user and admin can make changes to the user account
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};


// //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// verify admin 
export const verifyAdmin = (req, res, next) => { 
    verifyToken(req, res, next, () => { 
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};
