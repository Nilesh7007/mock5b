const express = require("express");

const app = express();

app.use(express.json());

const bodyParser = require("body-parser");

const cors = require("cors");

app.use(cors())

const connection = require("./db");



const userRouter = require("./route/userRoute")

const employeeRouter = require("./route/employeeRoute");


const auth= require("./middlewear/auth");

app.use("/user", userRouter)



app.use(auth)


app.get("/a", (req,res) =>{
    res.send("This is homepage")
})


app.use("/employees", employeeRouter)



app.listen(5080, async () =>{
try {
    await connection
    console.log("Connected to atlas dataBase!!!!!!!!")
} catch (error) {
    console.log(error)
}
console.log("server run on port 5080");
})