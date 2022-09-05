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
        <div className='header__container'>
          <button className='header__quit' onClick={signOut}>
            Выход
          </button>
        </div>
      ) : (
        <Link className='header__path' to={linkTo}>
          {location.pathname === '/signup' ? 'Войти' : 'Регистрация'}
        </Link>
      )}
    </header>
  );
}

export default Header;
