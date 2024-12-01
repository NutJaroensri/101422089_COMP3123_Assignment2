import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; 
import Signup from './components/Signup'; 
import EmployeesList from './components/EmployeeList' 

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employeesList" element={<EmployeesList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;