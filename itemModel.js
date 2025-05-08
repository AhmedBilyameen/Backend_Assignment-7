const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({

    itemName : {type: String, required: true}, 
    description : {type : String, default: ""},
    locationFound : {type: String, default: ""},
    dateFound : {type: Date, default: Date },
    claimed : {type : Boolean, default : false}

}, {timestamps : true} )

 const Item = new mongoose.model("itemCollection", itemSchema)

 module.exports = Item