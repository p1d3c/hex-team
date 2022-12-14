import './Register';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

function Register(props) {
  const [inputValues, setInputValues] = useState({username: '', password: ''});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleRegister(inputValues, setInputValues);
  };

  useEffect(() => {
    if (props.loggedIn) {
      navigate('../', {replace: true});
    }
  });

  return (
    <main className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <fieldset className='auth__form-set'>
          <label className='auth__form-field'>
            <input
              id='email-input'
              type='text'
              className='auth__input auth__input_type_username'
              value={inputValues.username}
              onChange={handleChange}
              name='username'
              placeholder='Имя пользователя'
              minLength='2'
              maxLength='40'
              required
            />
          </label>
          <label className='auth__form-field'>
            <input
              id='password-input'
              type='password'
              className='auth__input auth__input_type_password'
              value={inputValues.password}
              onChange={handleChange}
              name='password'
              placeholder='Пароль'
              minLength='2'
              maxLength='200'
              required
            />
          </label>
          <button type='submit' className='auth__submit' name='auth-submit'>
            Зарегистрироваться
          </button>
        </fieldset>
      </form>
      <p className='auth__login'>
        Уже зарегистрированы?{' '}
        <Link className='auth__login-btn' to='/signin'>
          Войти
        </Link>
      </p>
    </main>
  );
}

export default Register;
