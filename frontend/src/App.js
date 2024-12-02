import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; 
import Signup from './components/Signup'; 
import EmployeesList from './components/EmployeeList' 
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee'
import EmployeeDetails from './components/EmployeeDetails'
import SearchEmployee from './components/SearchEmployee';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employeesList" element={<EmployeesList />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/editEmployee" element={<EditEmployee />} />
          <Route path="/employeeDetails/:employeeId" element={<EmployeeDetails />} />
          <Route path="/searchEmployee" element={<SearchEmployee />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
