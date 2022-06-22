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

    console.log(response.data.message);
  } catch (e) {
    console.log(e.response.data.message);
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
      console.log('error', e.response.data.message);
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
      console.log('error', e.response.data.message);
    }
  };
};

export const updateProfile = (email, password, name, date_of_birth, gender) => {
  return async dispatch => {
    try {
      const response = await axios.put(
        `${API_URL}api/updateProfile?email=${email}&password=${password}&name=${name}&date_of_birth=${date_of_birth}&gender=${gender}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      dispatch(setUserCurrentAuth(response.data.user));

      console.log(response.data.message);
    } catch (e) {
      console.log(e.response.data.message);
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
      console.log(response.data.message);
    } catch (e) {
      console.log(e);
      console.log(e.response.data.message);
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
      console.log(response.data.message);
    } catch (e) {
      console.log(e.response.data.message);
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
      console.log(e.response.data.message);
    }
  };
};
