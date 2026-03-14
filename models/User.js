import mongoose from 'mongoose';

const {Schema} = 'mongoose';


//define the shape of the documents 
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    },

},
    {timestamps: true}); //this will add createdAt and updatedAt fields to the documents

export default mongoose.model('User', UserSchema);    