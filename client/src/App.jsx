import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AuthService from './services/auth.service';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';
import Notes from './components/Notes';
import FormNote from './components/Notes/FormNote';
import wizytowka from './components/wizytowka';
import Presentation from './components/presentation';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    } else {

    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <div className='navbar-nav mr-auto'>
          
          <li className='nav-item'>
            <Link to={'/'} className='nav-link'>
            Wizytówka
            </Link>
          </li>
        </div>
        {currentUser ? (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/profile'} className='nav-link'>
                {currentUser.username}
              </Link>
            </li>
            <li className='nav-item'>
              <a href='/login' className='nav-link' onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/login'} className='nav-link'>
                Login
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link to={'/register'} className='nav-link'>
                Sign Up
              </Link>
            </li> */}
          </div>
        )}
      </nav>
      <div className=''>
        <Switch>
          <ProtectedRoute exact path={['/', '/wizytowka']} component={wizytowka} />
          <Route exact path={'/wizytowka'} component={wizytowka} />
          <Route exact path='/login' component={Login} />
          {/* <Route exact path='/register' component={Register} /> */}
          <Route exact path='/profile' component={Profile} />
          <Route path='/user' component={BoardUser} />
          <Route path='/mod' component={BoardModerator} />
          <Route path='/admin' component={BoardAdmin} />
          <Route path='/:id' component={Presentation} />

        </Switch>
      </div>
    </div>
  );
};
export default App;
