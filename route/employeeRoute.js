const express = require("express");

const EmployeeModel = require("../model/employeeModel");

const employeeRouter = express.Router();

const bodyParser = require("body-parser");

employeeRouter.post("/employees", async(req,res) =>{

    const empData = req.body;

    try {
        const emp = new EmployeeModel(empData);
        await emp.save();
        res.status(200).json(emp)
    } catch (error) {
        res.status(400).json({msg:"err occured while adding emp"})
    }
})

employeeRouter.get("/", async (req,res) =>{
    try {
        const emps = await EmployeeModel.find();
        res.status(200).json(emps)
    } catch (error) {
        res.status(400).json({msg:"err occured while getting emp"})
    }
})

employeeRouter.patch("/employees/:id", async(req,res) =>{
const empid = req.params.id;

const empUpdata = req.body;
try {
    const emp = await EmployeeModel.findByIdAndUpdate(empid, empUpdata)
    if(!emp){
   res.status(400).json({msg: "emp not found"});
    }
    else{
        res.json(emp)
    }
} catch (error) {
    res.status(400).json({msg:"an error occured while updating"})
}
})

employeeRouter.delete("/employees/:id", async(req,res)=>{

    const empid = req.params.id;

    try {
        const emp = await EmployeeModel.findByIdAndDelete(empid);
        if(!emp){
            res.status(400).json({msg:"emp not found"})
        }
        else{
            res.status(200).json({msg:"emp deleted succesfully"})
        }
    } catch (error) {
        res.status(400).json({msg:"an error occured while deleting"})
    }
})


employeeRouter.get("/employees/filter/:department", async (req, res) => {
    const { department } = req.params;
  
    try {
      const filteredEmployees = await EmployeeModel.find({ department });
      res.status(200).json(filteredEmployees);
    } catch (error) {
      res.status(400).json({ msg: "An error occurred while filtering employees" });
    }
  });
  
  
  employeeRouter.get("/employees/sort/salary", async (req, res) => {
    try {
      const sortedEmployees = await EmployeeModel.find().sort({ salary: 1 });
      res.status(200).json(sortedEmployees);
    } catch (error) {
      res.status(400).json({ msg: "An error occurred while sorting employees" });
    }
  });
  
  
  employeeRouter.get("/employees/page", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
  
    try {
      const totalEmployees = await EmployeeModel.countDocuments();
      const totalPages = Math.ceil(totalEmployees / limit);
  
      const employees = await EmployeeModel.find()
        .skip((page - 1) * limit)
        .limit(limit);
  
      res.status(200).json({
        employees,
        currentPage: page,
        totalPages,
      });
    } catch (error) {
      res.status(400).json({ msg: "An error occurred while paginating employees" });
    }
  });

  module.exports = employeeRouter
  