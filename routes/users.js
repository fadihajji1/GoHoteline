import express from "express";
import { verifyAdmin, verifyToken,
         verifyUser 
        } from "../utils/verifyToken.js";
import { getUsers,
         getUser,
         updateUser,
         deleteUser 
        } from "../controllers/user.js";

const router = express.Router();

////test functions (verifyToken, verifyUser, verifyAdmin) 
// router.get("/checkauth", verifyToken, (req, res,next) => {
//        res.send("you are authentificated & logged in");
// })
// router.get("/checkuser/:id", verifyUser, (req, res,next) => {
//        res.send("hello user, you are logged in and authorized to delete/update account.");
// })    
// router.get("/checkadmin/:id", verifyAdmin, (req, res,next) => {
//        res.send("hello Admin,<br>you are logged in and authorized to delete/update ALL accounts.");
// })
   

//GET ALL
router.get("/ ", verifyAdmin, getUsers);  //use a external function for security reasons and makes the code more readable
//GET ONE                                        
router.get("/:id", verifyUser, getUser); // :id ==> means we are requesting Users by id
//UPDATE
router.put("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);



export default router;