import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // To extract the employee ID from the URL

const EmployeeDetails = () => {
  const { employeeId } = useParams(); // Get employee ID from URL
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      // Check if employeeId is available
      if (!employeeId) {
        setError("Employee ID is missing.");
        return;
      }
      
      try {
        console.log('Fetching details for employee ID:', employeeId);
        const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/${employeeId}`);
        
        if (response.data) {
          setEmployee(response.data); // Set employee data to state
        } else {
          setError('Employee not found.');
        }
      } catch (err) {
        setError('There was an error fetching employee details.');
        console.error(err);
      }
    };

    fetchEmployeeDetails();
  }, [employeeId]); // Run the effect when the employeeId changes

  if (error) {
    return <div>{error}</div>;
  }

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.detailsContainer}>
        <h2>Employee Details</h2>
        <table style={styles.table}>
          <tbody>
            <tr>
              <th style={styles.tableHeader}>First Name</th>
              <td>{employee.first_name}</td>
            </tr>
            <tr>
              <th style={styles.tableHeader}>Last Name</th>
              <td>{employee.last_name}</td>
            </tr>
            <tr>
              <th style={styles.tableHeader}>Email</th>
              <td>{employee.email}</td>
            </tr>
            <tr>
              <th style={styles.tableHeader}>Position</th>
              <td>{employee.position}</td>
            </tr>
            <tr>
              <th style={styles.tableHeader}>Salary</th>
              <td>{employee.salary}</td>
            </tr>
            <tr>
              <th style={styles.tableHeader}>Date of Joining</th>
              <td>{new Date(employee.date_of_joining).toLocaleDateString()}</td>
            </tr>
            <tr>
              <th style={styles.tableHeader}>Department</th>
              <td>{employee.department}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => navigate('/employeesList')} style={styles.button}>Go back</button>
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
  detailsContainer: {
    textAlign: 'center',
    width: '60%',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fefdf1',
  },
  table: {
    width: '100%',
    marginBottom: '20px',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    textAlign: 'left',
    fontWeight: 'bold',
    padding: '8px',
    backgroundColor: '#ebf9f6',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#17a589',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default EmployeeDetails;
