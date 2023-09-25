const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({

    First_Name:String,
    Last_Name:String,
    Email:String,
    Department :String,
    Salary:Number


},{
    versionKey:false
})

const EmployeeModel = mongoose.model("Employee", employeeSchema);


module.exports = EmployeeModel;

// {
    // "First_Name": "Nilesh",
    // "Last_Name": "Khade",
    // "Email": "n@gmail.com",
    // "Department" : "devlopment",
    // "Salary": 50400
// }