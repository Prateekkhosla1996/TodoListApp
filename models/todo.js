const mongoose=require('mongoose');
const todoSchema=new mongoose.Schema({

    description:{
        type:String
    },
    date:{
        type: Date
    },
    category:{
        type:String
    }
});
const Todo=mongoose.model('Contact',todoSchema);
module.exports=Todo;