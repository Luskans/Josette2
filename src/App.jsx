import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'flowbite';
import Home from './pages/home/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import ProfilView from './pages/profil/view/ProfilView';
import Error from './pages/Error';
import Signup from './pages/authentification/Signup';
import Login from './pages/authentification/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchThemes } from './store/themeSlice';
import ProfilUpdate from './pages/profil/update/ProfilUpdate';
import StoryView from './pages/story/view/StoryView';
import StoryCreate from './pages/story/create/StoryCreate';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const showHeaderAndFooter = location.pathname !== '/login' && location.pathname !== '/signup';
  const showBotNav = location.pathname === '/' || location.pathname.startsWith('/profil/view/');

  useEffect(() => {
    dispatch(fetchThemes());
  }, []);

  // useEffect(() => {
  // }, [location]);

  return (
    <div className={`flex flex-col items-between justify-between bg-white dark:bg-gray-900 ${showHeaderAndFooter && 'pt-20'} ${showBotNav && 'pb-16'} min-h-screen`}>
      <Toaster />
      {showHeaderAndFooter && <Header />}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profil/view/:id" element={<ProfilView />} />
          <Route path="/profil/update/:id" element={<ProfilUpdate />} />
          <Route path="/story/view/:id" element={<StoryView />} />
          <Route path="/story/create" element={<StoryCreate />} />
          <Route path="*" element={<Error />} />
      </Routes>
      {showHeaderAndFooter && <Footer />}
    </div>
  );
}
