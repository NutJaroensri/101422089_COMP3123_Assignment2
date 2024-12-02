import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

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
    <div>
      <h2>Search Employees</h2>
      
      <div>
        <label>
          <input 
            type="radio" 
            value="department" 
            checked={searchBy === 'department'} 
            onChange={() => setSearchBy('department')}
          />
          Department
        </label>
        <label>
          <input 
            type="radio" 
            value="position" 
            checked={searchBy === 'position'} 
            onChange={() => setSearchBy('position')}
          />
          Position
        </label>
      </div>

      <div>
        {searchBy && (
          <>
            <label>{searchBy === 'department' ? 'Department' : 'Position'}: </label>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </>
        )}
      </div>

      <button onClick={handleSearch}>Search</button>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div>
        <h3>Search Results</h3>
        {employees.length > 0 ? (
          <ul>
            {employees.map((employee) => (
              <li key={employee._id}>
                {employee.first_name} {employee.last_name} - {employee.position} ({employee.department})
              </li>
            ))}
          </ul>
        ) : (
          <div>No results found</div>
        )}
      </div>
      <button onClick={() => navigate('/employeesList')}>Go back</button>
    </div>
  );
};

export default SearchEmployee;
