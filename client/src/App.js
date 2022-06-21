import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
