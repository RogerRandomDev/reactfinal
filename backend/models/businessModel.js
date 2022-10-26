const mongoose= require('mongoose');

const BusinessSchema = new mongoose.Schema({
    Name:{
        type: String,
        required:true
    },
    ProductType:{
        type:String,
        required:true
    },
    TargetAudience:{
        type:String,
        required:true
    },
    Rating:{
        type:Number,
        default: 5
    },
    BannerLink:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model("Business",BusinessSchema)