import Register from '../Register/Register';
import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import {useEffect, useState} from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import * as auth from '../../utils/auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoggedIn(true);
      navigate('/');
    }
  }

  function handleRegister(inputValues, setInputValues) {
    auth
      .register(inputValues.username, inputValues.password)
      .then((res) => {
        if (res) {
          navigate('/signin');
          setInputValues({
            username: '',
            password: '',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(inputValues, setInputValues) {
    auth
      .login(inputValues.username, inputValues.password)
      .then((data) => {
        console.log(data);
        if (data.access_token) {
          localStorage.setItem('jwt', data.access_token);
          return data;
        }
      })
      .then(() => {
        setInputValues({
          username: '',
          password: '',
        });
        setLoggedIn(true);
        console.log('loggedIn true');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    navigate('/signin');
    setLoggedIn(false);
  }

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='page'>
      <Header loggedIn={loggedIn} handleSignOut={handleSignOut} />
      <Routes>
        <Route path='/signup' element={<Register handleRegister={handleRegister} />} />
        <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
        <Route
          path='/'
          element={
            <ProtectedRoute loggedIn={loggedIn} redirectTo='/signin'>
              <Main />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
