const express = require('express')
const employeeModel = require('../models/employee')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.send('Hello World from Employee')
})

// Get all Employees
routes.get('/employees', (req, res) => {
    employeeModel.find().then((employees) => {
        res.send(employees)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
})

//Add New Employee
routes.post("/employees", async (req, res) => {
    const employeeData = req.body
    console.log(employeeData)
    try{
        // Create a new employee instance
        const employee = new employeeModel(employeeData)

        // Save the employee to MongoDB
        const newEmployee = await employee.save()
        res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
    } catch (error){
        res.status(500).send({message: error.message})
    }

    // res.send(message: Add New Book})
})

// Search employee(s) 
routes.get("/employees/search", (req, res) => {
    const { department, position } = req.query;
    const query = {};

    if (department) {
        query.department = department;
    }
    if (position) {
        query.position = position;
    }
    employeeModel.find(query)
        .then((employees) => {
            if (employees.length > 0) {
                res.status(200).send(employees);
            } else {
                res.status(404).send({ message: "No employee found." });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

//Get Employee By ID
routes.get("/employees/:eid", (req, res) => {
    employeeModel/employeeModel.findById(req.params.eid)
    .then((employee) => {
        if(employee){
            res.status(200).send(employee)
        }else{
            res.status(404).send({message: "There is no employee with this ID"})
        }
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    
})

//Update Existing employee
routes.put("/employees/:eid", (req, res) => {
    employeeModel.findByIdAndUpdate(req.params.eid, req.body, {new: true})
    .then((employee) => {
        if(employee){
            res.status(200).send({message: "Employee details updated successfully."})
        }else{
            res.status(404).send({message: "There is no employee with this ID"})
        }
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
})

// Delete employee by ID
routes.delete("/employees", (req, res) => {
    const employeeId = req.query.eid
    employeeModel.findByIdAndDelete(employeeId)
    .then((employee) => {
        if(employee){
            res.status(204).send({ message: "Employee deleted successfully."})
        }else {
            res.status(404).send({ message: "There is no employee with this ID" });
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })
})



module.exports = routes