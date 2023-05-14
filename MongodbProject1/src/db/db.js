const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/empform')
.then(()=>{
    console.log(`connect`);
})
.catch((error)=>{
    console.log(error);
})
const empSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    phone : {
        type : Number,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    cpassword : {
        type : String,
        required : true,
    }
});

const empCollection = new mongoose.model('empcollection', empSchema);

module.exports = empCollection;
