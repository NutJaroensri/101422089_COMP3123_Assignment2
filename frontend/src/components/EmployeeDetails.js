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
    <div>
      <h2>Employee Details</h2>
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <td>{employee.first_name}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{employee.last_name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{employee.email}</td>
          </tr>
          <tr>
            <th>Position</th>
            <td>{employee.position}</td>
          </tr>
          <tr>
            <th>Salary</th>
            <td>{employee.salary}</td>
          </tr>
          <tr>
            <th>Date of Joining</th>
            <td>{new Date(employee.date_of_joining).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th>Department</th>
            <td>{employee.department}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => navigate('/employeesList')}>Go back</button>
    </div>
  );
};

export default EmployeeDetails;
