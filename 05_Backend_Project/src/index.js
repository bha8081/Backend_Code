//require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/dbConnection.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!!", err);
})





/* Another porfesnal way to connect database code using efi(emidite invoke function) aap chahe to function ka us kr ke bhi bana sakte hai. */
/* 
import express from "express"
const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.log("ERROR: ", error)
        throw err
    }
})() 

*/