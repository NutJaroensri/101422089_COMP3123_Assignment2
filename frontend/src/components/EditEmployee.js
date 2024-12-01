import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EditEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employee, index } = location.state || {};
  
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    salary: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState('');

  // Pre-populate form with existing employee data
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        position: employee.position,
        salary: employee.salary,
        email: employee.email,
        phone: employee.phone,
      });
    }
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation (simple example)
    if (!formData.name || !formData.position || !formData.salary) {
      setError('Please fill in all required fields.');
      return;
    }
    
    // Update employee data in the parent component (or state management)
    // Here, assume the update function is passed from a parent or handle it through global state
    // Assuming you use a function like `updateEmployee` to update the employee in the list
    try {
      // Example: You would update the employee list here
      // updateEmployee(index, formData);
      navigate('/');  // Navigate back to the employee list page
    } catch (err) {
      setError('Failed to update employee.');
    }
  };

  return (
    <div>
      <h1>Edit Employee</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
