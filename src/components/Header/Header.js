import './Header.css';
import React from 'react';
import {Link, useLocation} from 'react-router-dom';

function Header(props) {
  const location = useLocation();

  const linkTo = location.pathname === '/signup' ? '/signin' : '/signup';

  function signOut() {
    props.handleSignOut();
  }

  return (
    <header className='header'>
      {props.loggedIn ? (
        <Link className='header__quit' onClick={signOut} to={'/signin'}>
          Выход
        </Link>
      ) : (
        <Link className='header__path' to={linkTo}>
          {location.pathname === '/signup' ? 'Войти' : 'Регистрация'}
        </Link>
      )}
    </header>
  );
}

export default Header;
