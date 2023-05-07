const mongoose =require("mongoose");

const DB="mongodb+srv://joel80851:joel80851@cluster0.ypxljdh.mongodb.net/mernstack?retryWrites=true&w=majority";
// const DB=process.env.DATABASE

mongoose.connect(DB,{
    
    useNewUrlParser: true,
    useUnifiedTopology: true
    
}).then(()=>console.log("connection start")).catch((error)=>console.log(error.message));