import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


//CREATE
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
        console.log("\u001b[1;33m hotel '",req.body.name,"' has been created.\u001b[1;33m"); //yellow color: \u001b[1;33m  (at the begin and end of message)

    } catch (err) {
        next(err);
        console.log("\u001b[1;31m the hotel id you wish to update don't exist. \u001b[1;31m");  //red color: \u001b[1;31m  (at the begin and end of message)
        
        //MY CUSTOM ERROR MESSAGE: (turn "next(err)" into comment)
        //res.status(404).json("hotel id don't exist"); 
    }
};


//UPDATE
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body},
            {new: true}  //to return the updated not the original
        );
        res.status(200).json(updatedHotel);
        console.log("\u001b[1;33m  hotel id=",req.params.id ,"has been updated to", req.body ,". \u001b[1;33m "); 
    } catch (err) {
        next(err);
    }
};

//DELETE
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id, 
        );
        res.status(200).json("hotel has been deleted");
        console.log("\u001b[1;33m 'hotel has been deleted.' \u001b[1;33m"); 
    } catch (err) {
        next(err);
        console.log("\u001b[1;31m the hotel id you wish to delete don't exist \u001b[1;31m");  
    }
};

//GET ONE
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
        console.log("\u001b[1;31m the hotel id you're looking for, don't exist. \u001b[1;31m");  
    }
};

//GET ALL
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

//------------------------Features--------------------------------------------
//count cities by name
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");  //split the string into an array with "," as separator
    try {
      const list = await Promise.all(    //Promise.all() is used to execute multiple promises (action) in parallel
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });  //similar to ".find({city:city}).length" but faster
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };

  //count cities by type
  export const countByType = async (req, res, next) => {  
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };

  //get hotel rooms by id (hotel)
  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id); //await means wait for the promise to be resolved
      const list = await Promise.all(  //promise used to execute multiple promises (action) in parallel
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };
  