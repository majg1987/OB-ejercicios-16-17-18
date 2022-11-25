import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginPage from './pages/auth/loginPage';
import RegisterPage from './pages/auth/registerPage'
import HomePage from './pages/home/homePage';

const AppRouting = () => {

    let loggedIn = true;
    return (
        <div>
            <Router>
                <Routes>
                    {/* Redirections to protect our routes */}
                    <Route exact path='/' element={loggedIn ? 
                                                    <Navigate to='/home' /> 
                                                    : 
                                                    <Navigate to='/login' /> 
                                                    } 
                    />
                    {/* Home Route */}
                    <Route exact path='/home' element={loggedIn ?
                                                         <HomePage loggedIn={loggedIn} />
                                                         :
                                                         <Navigate to='/login'/> }  
                    />
                    {/* Login Route */}
                    <Route exact path='/login' element={<LoginPage loggedIn={loggedIn}/>} />
                    {/* Register route */}
                    <Route exact path='/register' element={<RegisterPage/>} />
                    {/* Not Found Page */}
                </Routes>
            </Router>
        </div>
    );
}

export default AppRouting;
