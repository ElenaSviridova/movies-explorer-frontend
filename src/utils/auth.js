export const BASE_URL = 'https://api.es.sviridova.nomoredomains.monster';

const checkResponse = (response) => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`)

export const register = (userName, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userName, email, password})
  })
  .then(checkResponse)
  
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(checkResponse)
};
