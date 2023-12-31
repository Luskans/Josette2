import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import 'flowbite';

import Home from './pages/home/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import StoryCreate from './pages/story/StoryCreate';
import ProfilDetails from './pages/profil/ProfilDetails';
import Error from './pages/Error';
import ProfilList from './pages/profil/ProfilList';
import Signup from './pages/authentification/Signup';
import Login from './pages/authentification/Login';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const showHeaderAndFooter = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <NextUIProvider navigate={navigate}>
        <Toaster />
        {showHeaderAndFooter && <Header />}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profil" element={<ProfilList />} />
            <Route path="/profil/detail" element={<ProfilDetails />} />
            <Route path="/story/create" element={<StoryCreate />} />
            <Route path="*" element={<Error />} />
        </Routes>
        {showHeaderAndFooter && <Footer />}
    </NextUIProvider>
  );
}
