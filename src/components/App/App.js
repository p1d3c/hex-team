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
      navigate('../', {replace: true});
    }
  }

  function handleRegister(inputValues, setInputValues) {
    auth
      .register(inputValues.username, inputValues.password)
      .then((res) => {
        if (res) {
          navigate('../signin', {replace: true});
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
        navigate('../', {replace: true});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('../signin', {replace: true});
  }

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='page'>
      <Header loggedIn={loggedIn} handleSignOut={handleSignOut} />
      <Routes>
        <Route path='/signup' element={<Register handleRegister={handleRegister} loggedIn={loggedIn} />} />
        <Route path='/signin' element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />} />
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
