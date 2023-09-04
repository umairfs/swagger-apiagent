const Employee = require('../models/employees.models');
const crypto = require('crypto');

function generateMD5Hash(data) {
  const hash = crypto.createHash('md5').update(data).digest('hex');
  return hash;
}

const inputString = 'Hello, World!';
const md5Hash = generateMD5Hash(inputString);
console.log('MD5 Hash:', md5Hash);
// show the list of employees
const index = (req, res, next) => {
    
    // Example usage
    Employee.find()
    .then(response => {
        res.json({
            response
        });
    })
    .catch(error => {
        res.json({
            message : 'An error occured!'
        })
    })
};

//fetch individual records from db
const show = (req, res, next) => {
    let employeeID = req.body.employeeID;
    Employee.findById(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message : 'An error occured!'
        })
    })
};

// insert employee record
const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    employee.save()
    .then(response => {
        res.json({
            message : 'Employee Added Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
};

// update an employee
const update = (req, res, next) => {
    let employeeID = req.body.employeeID;

    let updateData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updateData})
    .then(response => {
        res.json({
            message : 'Employee Edited Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
};

// delete an employee
const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID;
    Employee.findByIdAndRemove(employeeID)
    .then(response => {
        res.json({
            message : 'Employee Deleted Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
};

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};