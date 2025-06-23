import mongoose from "mongoose";
import app from "./app";

let server;
const PORT = 3080
async function main() {
    try {
        await mongoose.connect('mongodb+srv://mongooseTodo:aDd9RWZVuxAJB7tl@cluster0.encxuwd.mongodb.net/libraryManagement?retryWrites=true&w=majority&appName=Cluster0')
       console.log('connect mongoose')
        server = app.listen(PORT, ()=>{
            console.log(`app successfully listen ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()