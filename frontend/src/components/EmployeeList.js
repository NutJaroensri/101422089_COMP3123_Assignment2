import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  

  // Fetch employees data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/emp/employees');
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  // Handle delete employee
  const handleDelete = async (employeeId) => {
    // Show confirmation dialog before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/v1/emp/employees?eid=${employeeId}`);
        setEmployees(employees.filter(employee => employee._id !== employeeId));
       
      } catch (err) {
        console.error("Error deleting employee:", err);
        alert("There was an error deleting the employee.");
      }
    } else {
      // If the user cancels, do nothing
      console.log("Delete operation canceled.");
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>
                <button onClick={() => navigate(`/edit-employee/${employee._id}`)}>Update</button>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                <button onClick={() => navigate(`/employeeDetails/${employee._id}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/addEmployee')}>Add Employee</button>
      <Link to="/searchEmployee">
        <button>Search Employees</button> {/* Search button */}
      </Link>
      <Link to="/">
        <button>Log out</button> {/* Search button */}
      </Link>
    </div>
  );
};

export default EmployeeList;
