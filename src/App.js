import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        </Routes>
        </Router>
  );
}

export default App;