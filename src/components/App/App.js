import Register from '../Register/Register';
import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import {useEffect, useState} from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import * as api from '../../utils/Api';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [statistics, setStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shortLinkData, setShortLinkData] = useState({
    id: '',
    short: '',
    target: '',
    counter: '',
  });
  const navigate = useNavigate();

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoggedIn(true);
      navigate('../', {replace: true});
    }
  }

  function handleRegister(inputValues, setInputValues) {
    setIsLoading(true);

    api
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(inputValues, setInputValues) {
    api
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

  function handleAddStatistics() {
    setIsLoading(true);

    const offset = statistics.length + 1;
    const limit = 40;

    api
      .getStatistics(offset, limit)
      .then((res) => {
        setStatistics((prev) => {
          return prev.concat(res);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSqueeze(link) {
    api
      .squeeze(link)
      .then((res) => {
        setShortLinkData(res);
        setStatistics([res, ...statistics]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    setIsLoading(true);

    api
      .getStatistics(0, 40)
      .then((res) => {
        setStatistics(res);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  return (
    <>
      <Header loggedIn={loggedIn} handleSignOut={handleSignOut} />
      <Routes>
        <Route path='/signup' element={<Register handleRegister={handleRegister} loggedIn={loggedIn} />} />
        <Route path='/signin' element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />} />
        <Route
          path='/'
          element={
            <ProtectedRoute loggedIn={loggedIn} redirectTo='/signin'>
              <Main
                statistics={statistics}
                handleAddStatistics={handleAddStatistics}
                handleSqueeze={handleSqueeze}
                shortLinkData={shortLinkData}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Loader isLoading={isLoading} />
      <Footer />
    </>
  );
}

export default App;
