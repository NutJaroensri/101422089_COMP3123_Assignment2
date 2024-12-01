import React, { useState } from 'react';

const AddEmployee = ({ onAddEmployee }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error and success messages
    setError('');
    setSuccess('');

    // Validate form inputs
    if (!name || !position || !salary) {
      setError('All fields are required');
      return;
    }

    if (isNaN(salary) || salary <= 0) {
      setError('Salary must be a positive number');
      return;
    }

    // Create employee object
    const newEmployee = {
      name,
      position,
      salary: parseFloat(salary), // Convert salary to a number
    };

    // Call the onAddEmployee function (could be passed down as a prop)
    onAddEmployee(newEmployee);

    // Reset the form fields
    setName('');
    setPosition('');
    setSalary('');

    // Show success message
    setSuccess('Employee added successfully!');
  };

  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
