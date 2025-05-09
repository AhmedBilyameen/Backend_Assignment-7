
require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const Item = require("./itemModel")


const app = express() //app use express

app.use(express.json()) // middleware to parse json type

const PORT = process.env.PORT || 6000

const MONGODB_URL = process.env.MONGODB_URL;


// const MONGODB_URL = "mongodb+srv://cohort3:<>@cohort-3.lcs4vhc.mongodb.net/?retryWrites=true&w=majority&appName=cohort-3"

mongoose.connect(MONGODB_URL)
.then(()=>{

    console.log(`Database connected...`)

    app.listen(PORT, ()=>{

        console.log(`Server is running on port ${PORT}`)
    })
}) 

//API's

app.get("/", (req, res) => {
    res.json(`Welcome to Campus Lost & Found System!`)
})

// 1. Add a found item
app.post("/add-item", async (req, res) => {

    const { itemName, description, locationFound, dateFound, claimed } = req.body;

    if (!itemName) {
        return res.status(404).json(`Message: Item name is required.`)   
    }

    const createItem = new Item({ itemName, description, locationFound, dateFound, claimed })

    await createItem.save()

    res.status(201).json({
        message : `Item added Successful`,
        createItem
    })
})

//2.  View all unclaimed items
app.get("/unclaimed-items", async (req, res) =>{
    
    const unclaimed = await Item.find({ claimed : false})

    if (unclaimed.length < 1) {
        return res.status(404).json({
            message: `No unclaimed Item at the moment, please come back later!`
        })
    }

    res.status(200).json({
        message : `List of all unclaimed items`,
        length: unclaimed.length,
        data: unclaimed
    })

})

// 3. View one item by ID
app.get("/item/:id", async (req, res) =>{

    const { id } = req.params

    const item = await Item.findById( id  )

    if (!item) {
        return res.status(404).json({
            message: `Item not found!`
        })
    }

    res.status(200).json({
        message : `Successful`,
        data: item
    })

})

//4.  Update an item’s details or mark as claimed
app.patch("/item/:id", async (req, res) =>{

    const { id } = req.params

    const { claimed } = req.body

    const updateId = await Item.findById( id )

    if (!updateId) {
        return res.status(404).json({
            message: `Item not found!`
        })
    }

    // const updateField = await Item.findByIdAndUpdate(id, { claimed }, { new : true})
    
     updateId.claimed = claimed

     await updateId.save()

     res.status(200).json({
        message : `Item Updated Successful`,
        data: updateId
     })
    
})

// 5. Delete old/irrelevant entries
app.delete("/item/:id", async (req, res) =>{

    const { id } = req.params

    const item = await Item.findByIdAndDelete(id)  
    
    if (!item) {
        return res.status(404).json({ message: `Item not found, nothing to delete` })
    }

    res.status(200).json( {message : `Item deleted successfully`} )
})

