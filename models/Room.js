import mongoose from 'mongoose';



//define the shape of the documents 
const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    roomNumber: [{number: Number, unavailableDates: {type: [Date]}}],
    // example:
    // {number: 101, unavailableDates: []
    // {number: 102, unavailableDates: []
    // {number: 103, unavailableDates: [12/12/2020, 13/12/2020, 14/12/2020]
},
    {timestamps: true}
);



export default mongoose.model('Room', RoomSchema);    