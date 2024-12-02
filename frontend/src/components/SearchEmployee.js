import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchEmployee = () => {
  const [searchBy, setSearchBy] = useState(''); // Track which criterion the user selects
  const [searchValue, setSearchValue] = useState(''); // Store the value for department or position
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle search button click
  const handleSearch = async () => {
    if (!searchBy || !searchValue) {
      setError('Please select a search criterion and provide a value.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/v1/emp/employees/search', {
        params: {
          [searchBy]: searchValue, // Use the selected searchBy criterion
        },
      });

      // Update state with the search results
      setEmployees(response.data);
      setError('');
    } catch (err) {
      // Handle error if the API request fails
      setError('No employees found or there was an error with the request');
      setEmployees([]);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Search Employees</h2>
        <div style={styles.radioContainer}>
          <label>
            <input 
              type="radio" 
              value="department" 
              checked={searchBy === 'department'} 
              onChange={() => setSearchBy('department')}
              style={styles.radioInput}
            />
            Department
          </label>
          <label>
            <input 
              type="radio" 
              value="position" 
              checked={searchBy === 'position'} 
              onChange={() => setSearchBy('position')}
              style={styles.radioInput}
            />
            Position
          </label>
        </div>

        <div>
          {searchBy && (
            <>
              <label style={styles.label}>{searchBy === 'department' ? 'Department' : 'Position'}: </label>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={styles.inputField}
              />
            </>
          )}
        </div>

        <button onClick={handleSearch} style={styles.button}>Search</button>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.resultsContainer}>
          <h3>Search Results</h3>
          {employees.length > 0 ? (
            <ul style={styles.resultsList}>
              {employees.map((employee) => (
                <li key={employee._id} style={styles.resultItem}>
                  {employee.first_name} {employee.last_name} - {employee.position} ({employee.department})
                </li>
              ))}
            </ul>
          ) : (
            <div>No results found</div>
          )}
        </div>
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
  formContainer: {
    textAlign: 'center',
    width: '80%',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fefdf1',
  },
  radioContainer: {
    marginBottom: '20px',
  },
  radioInput: {
    margin: '0 10px',
  },
  label: {
    fontSize: '16px',
  },
  inputField: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    width: '80%',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#17a589',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  resultsContainer: {
    marginTop: '20px',
  },
  resultsList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  resultItem: {
    marginBottom: '10px',
  },
};

export default SearchEmployee;
