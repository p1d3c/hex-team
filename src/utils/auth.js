import {BASE_URL} from './constants';

export const register = (username, password) => {
  return fetch(`${BASE_URL}/register?username=${username}&password=${password}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    try {
      if (res.ok) {
        return res.json();
      }
    } catch (err) {
      return err;
    }
  });
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({username, password}),
  }).then((res) => {
    try {
      if (res.ok) {
        return res.json();
      }
    } catch (err) {
      return err;
    }
  });
};
