import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import {createError} from "../utils/error.js";




//::::::::::::::::::::::: CRUD Rooms ::::::::::::::::::::::

//CREATE
export const createRoom = async (req, res, next) => {
    const roomNumber = req.body.roomNumber;  //for console.log purposes
    const hotelId = req.params.hotelid; 
    const newRoom =  new Room (req.body);
    
    try {
        const savedRoom = await newRoom.save();
        try{
            //put the room (savedRoom) id in the hotel rooms array
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}}); 
        }
        catch(err){
            next(err);
        }
        res.status(201).json(savedRoom);
        console.log("\u001b[1;33m the following rooms has been created.\u001b[1;33m \n hotel id: '", hotelId); 
        console.table(roomNumber);
    } catch (err) {
        next(err);
    }
};

//UPDATE
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body},  // update the room with the new data
            {new: true}       //to return the updated not the original
        );
        res.status(200).json(updatedRoom);
        console.log("\u001b[1;33m room id=",req.params.id ,"of",hotelName,"has been updatedto", req.body ,". \u001b[1;33m "); 
    } catch (err) {
        next(err);
    }
};

//DELETE
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);  //delete all rooms in on tap: change "findByIdAndDelete" with "deleteMany" + remove ":id" in rooms.js 
            try{
                await Hotel.findByIdAndUpdate(
                    hotelId,
                    {$pull: {rooms: req.params.id}}  // $pull removes the value from an existing array
                    );
            }
            catch(err){
                next(err);
            }
        res.status(200).json("Room has been deleted");
    } catch (err) {
        next(err);
    }
};

//GET ONE
export const getRoom = async (req, res, next) => {
    
    try {
        const room = await Room.findById(req.params.id);
            res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};

//GET ALL
export const getRooms = async (req, res, next) => {
    
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};

//UPDATE availability
export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumber._id": req.params.id},
            { 
                $push: {
                    "roomNumber.$.unavailableDates": req.body.dates  //roomNumber.$.availableDates =>> is an advanced query of mongoDB to update the availability of a specific roomNumber
                },
            }
        );
        res.status(200).json("Room status has been updated.");
        console.log("\u001b[1;33m room id=",req.params.id ,"is not available on", req.body.dates  ," \u001b[1;33m "); 
    } catch (err) {
        next(err);
    }
};