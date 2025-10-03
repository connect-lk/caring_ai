import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect("mongodb://aibid:GXJhtxE8dEWAjXfp@89.117.58.114:27017/aibid", {
            dbName: "aibid"
        })
        .then(() => {
            console.log("connected to database")
        }).catch((err) => {
            console.log(`something error occured while connectuing to databse:${err}`)
        })
}