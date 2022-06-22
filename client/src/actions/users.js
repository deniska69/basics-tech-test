import axios from 'axios';
import { setUserCurrentAuth, setUserAllList } from '../reducers/userReducer';
import { API_URL } from '../config';
import { WWW_URL } from '../config';

export const registration = async (email, password, name, date_of_birth, gender, avatar) => {
  try {
    const formData = new FormData();
    formData.append('file', avatar);

    const response = await axios.post(
      `${API_URL}api/registration?email=${email}&password=${password}&name=${name}&date_of_birth=${date_of_birth}&gender=${gender}`,
      formData
    );

    alert(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${API_URL}api/login`, {
        email,
        password,
      });

      dispatch(setUserCurrentAuth(response.data.user));
      localStorage.setItem('token', response.data.token);
      window.location.href = `${WWW_URL}account`;
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const auth = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API_URL}api/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      dispatch(setUserCurrentAuth(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      localStorage.removeItem('token');
      alert(e.response.data.message);
    }
  };
};

export const updateName = name => {
  return async dispatch => {
    try {
      const response = await axios.put(`${API_URL}api/updateName?name=${name}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      dispatch(setUserCurrentAuth(response.data.user));

      alert(response.data.message);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const updatePassword = password => {
  return async dispatch => {
    try {
      const response = await axios.put(`${API_URL}api/updatePassword?password=${password}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      dispatch(setUserCurrentAuth(response.data.user));

      alert(response.data.message);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const deleteAvatar = () => {
  return async dispatch => {
    try {
      const response = await axios.put(`${API_URL}api/deleteAvatar`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      dispatch(setUserCurrentAuth(response.data.user));
      alert(response.data.message);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const uploadAvatar = file => {
  return async dispatch => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.put(`${API_URL}api/uploadAvatar`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      dispatch(setUserCurrentAuth(response.data.user));
      alert(response.data.message);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const allUsers = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API_URL}api/allUsers`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      dispatch(setUserAllList(response.data.users));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};
