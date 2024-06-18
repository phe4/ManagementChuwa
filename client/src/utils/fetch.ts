const token: string = localStorage.getItem('token') || '';
const prefix = '/client';

interface errType {
  message: string
}

const request = async (url: string = '', method: string = '', data: object = {}) => {
  const response = await fetch(prefix + url, {
    method: method,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(data)
  });
  if (response.status === 401) {
    localStorage.clear();
    window.location.href = '/signin';
  }else if (response.status === 200 || response.status === 201) {
    return response.json();
  } else {
    const err: errType = await response.json() as errType;
    throw new Error(err.message);
  }
};

export const getRequest = (url: string) => {
  return request(url, 'GET');
};

export const postRequest = (url: string, data: object) => {
  return request(url, 'POST', data);
};

export const putRequest = (url: string, data: object) => {
  return request(url, 'PUT', data);
};

export const deleteRequest = (url: string) => {
  return request(url, 'DELETE');
};