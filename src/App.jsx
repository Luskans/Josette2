import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'flowbite';

import Home from './pages/home/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import StoryCreate from './pages/story/StoryCreate';
import ProfilView from './pages/profil/ProfilView';
import Error from './pages/Error';
import Signup from './pages/authentification/Signup';
import Login from './pages/authentification/Login';
import { fetchConnectedUser } from './store/authSlice2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchThemes } from './store/themeSlice';
import ProfilUpdate from './pages/profil/ProfilUpdate';
import StoryView from './pages/story/StoryView';

export default function App() {
  const dispatch = useDispatch();
  // const user = useSelector(state => state.auth2.user);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = localStorage.getItem('theme');
  const showHeaderAndFooter = location.pathname !== '/login' && location.pathname !== '/signup';
  const showBotNav = location.pathname === '/' || location.pathname.startsWith('/profil/view/');

  // POUR VOIR LE CONNECTED QU'AVEC COOKIE
  // useEffect(() => {
  //   dispatch(fetchConnectedUser());
  //   console.log('app', user)
  // }, []);

  useEffect(() => {
    dispatch(fetchThemes());
  }, []);

  useEffect(() => {
  }, [location]);

  return (
    <>
    <main className={`main ${theme ?? 'light'} text-foreground bg-background ${showHeaderAndFooter && 'pt-16'} ${showBotNav && 'pb-16'}`}>
      <Toaster />
      {showHeaderAndFooter && <Header />}
      <Routes>
          <Route path="/" element={<Home key={window.location.pathname} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profil/view/:id" element={<ProfilView />} />
          <Route path="/profil/update/:id" element={<ProfilUpdate />} />
          <Route path="/story/create" element={<StoryCreate />} />
          {/* <Route path="/story/view/:id" element={<StoryView key={window.location.pathname} />} /> */}
          <Route path="/story/view/:id" element={<StoryView />} />
          <Route path="*" element={<Error />} />
      </Routes>
      {showHeaderAndFooter && <Footer />}
    </main>
    </>
  );
}
