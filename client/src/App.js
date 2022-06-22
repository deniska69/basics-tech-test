import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './actions/users';
import { useEffect } from 'react';
import Home from './pages/Home';
import Error from './pages/Error';
import Account from './pages/Account';
import People from './pages/People';

export default function App() {
  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.user.isAuth);
  const token = localStorage.getItem('token');

  if (token) {
    // eslint-disable-next-line
    useEffect(() => {
      dispatch(auth());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      {isAuth && <Route path="/account" element={<Account />} />}
      {isAuth && <Route path="/people" element={<People />} />}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
