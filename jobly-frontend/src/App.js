import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import Home from './Home';
import NavBar from './NavBar';
import Jobs from './Jobs';
import Profile from './Profile';
import RegistrationForm from './userAuth/RegistrationForm';
import LoginForm from './userAuth/LoginForm';
import ProtectedRoute from './ProtectedRoute';
import Companies from './Companies';
import Company from './Company';
import ApplyJob from './ApplyJob';



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/jobs' element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/companies' element={<ProtectedRoute><Companies /></ProtectedRoute>} />

            <Route path='/company/:handle' element={<ProtectedRoute><Company /></ProtectedRoute>} />

            <Route path='/register' element={<RegistrationForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/apply/:jobId' element={<ProtectedRoute><ApplyJob /></ProtectedRoute>} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
