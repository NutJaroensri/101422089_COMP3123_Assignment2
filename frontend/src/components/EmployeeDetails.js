import React from 'react';
import { useLocation } from 'react-router-dom';

const EmployeeDetails = () => {
  const location = useLocation();
  const { employee } = location.state || {};

  if (!employee) {
    return <p>No employee data available.</p>;
  }

  return (
    <div>
      <h1>Employee Details</h1>
      <div className="employee-detail">
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
      </div>
    </div>
  );
};

export default EmployeeDetails;
