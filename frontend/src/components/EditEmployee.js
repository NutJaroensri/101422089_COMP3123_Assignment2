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

  // Pre-fill the form with the existing data if available
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        position: employee.position || '',
        salary: employee.salary || '',
        email: employee.email || '',
        phone: employee.phone || '',
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

    // Ensure the required fields are filled in before submitting
    if (!formData.name || !formData.position || !formData.salary) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      // Here, you'd usually update the employee data in your database
      // Only update fields that are not empty
      const updatedEmployee = { ...employee };

      if (formData.name) updatedEmployee.name = formData.name;
      if (formData.position) updatedEmployee.position = formData.position;
      if (formData.salary) updatedEmployee.salary = formData.salary;
      if (formData.email) updatedEmployee.email = formData.email;
      if (formData.phone) updatedEmployee.phone = formData.phone;

      // After the update logic, navigate to the desired page
      navigate('/');
    } catch (err) {
      setError('Failed to update employee.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1>Edit Employee</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>Save Changes</button>
          </div>
          <div style={styles.buttonContainer}>
            <button onClick={() => navigate('/employeesList')} style={styles.button}>
              Go back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '0 30px',  // Add more space to the sides
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '500px', // Increase the width of the form container
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    textAlign: 'left',
    width: '100%',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    marginBottom: '15px', // Increased space between fields
  },
  button: {
    padding: '12px',
    backgroundColor: '#17a589',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',  // Ensure buttons are the same size
  },
  buttonHover: {
    backgroundColor: '#1e8f7c',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '20px',
  },
  buttonContainer: {
    marginTop: '10px',  // Space between the buttons
  },
};

export default EditEmployee;
