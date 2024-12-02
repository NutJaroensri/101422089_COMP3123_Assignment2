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
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Employee List</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>First Name</th>
              <th style={styles.th}>Last Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td style={styles.td}>{employee.first_name}</td>
                <td style={styles.td}>{employee.last_name}</td>
                <td style={styles.td}>{employee.email}</td>
                <td style={styles.td}>
                  <button onClick={() => navigate(`/editEmployee/${employee._id}`)} style={styles.button}>Update</button>
                  <button onClick={() => handleDelete(employee._id)} style={styles.button}>Delete</button>
                  <button onClick={() => navigate(`/employeeDetails/${employee._id}`)} style={styles.button}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.buttonsContainer}>
          <button onClick={() => navigate('/addEmployee')} style={styles.button}>Add Employee</button>
          <Link to="/searchEmployee">
            <button style={styles.button}>Search Employees</button>
          </Link>
          <Link to="/">
            <button style={styles.button}>Log out</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Styling for consistent design
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    paddingTop: '50px',
  },
  formContainer: {
    textAlign: 'center',
    width: '80%',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fefdf1',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    border: '2px solid #17a589', // Border color added to the table
  },
  th: {
    backgroundColor: '#f1f1f1',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #17a589', // Add border to headers
  },
  td: {
    padding: '12px',
    textAlign: 'left',
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd', // Border added for consistency
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#17a589',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '5px',
  },
  buttonsContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center', // Center the buttons
    gap: '10px', // Space between buttons
  },
};

export default EmployeeList;
