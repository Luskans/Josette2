import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

// import {NextUIProvider} from '@nextui-org/react'
// import styled from 'styled-components';
// import {
//   createBrowserRouter,
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from 'react-router-dom';
// import Home from './pages/home/Home';
// import MobileHeader from './components/MobileHeader';
// import Footer from './components/Footer';
// import StoryCreate from './pages/story/StoryCreate';
// import ProfilDetails from './pages/profil/ProfilDetails';
// import Error from './pages/Error';
// import ProfilList from './pages/profil/ProfilList';
// import Signin from './pages/authentification/Signin';
// import Login from './pages/authentification/Login';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/signin',
//     element: <Signin />,
//   },
//   {
//     path: '/story/create',
//     element: <StoryCreate />,
//   },
//   {
//     path: '/profil',
//     element: <ProfilList />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <NextUIProvider>
  //     <Router router={router}>
  //       <Provider store={store}>
  //         <main className="light text-foreground bg-background">
  //           <MobileHeader />
  //           <Routes>
  //             <Route path="/" element={<Home />} />
  //             <Route path="/signin" element={<Signin />} />
  //             <Route path="/login" element={<Login />} />
  //             <Route path="/profil" element={<ProfilList />} />
  //             <Route path="/profil/detail" element={<ProfilDetails />} />
  //             <Route path="/story/create" element={<StoryCreate />} />
  //             <Route path="*" element={<Error />} />
  //           </Routes>
  //           <Footer />
  //         </main>
  //       </Provider>
  //     </Router>
  //   </NextUIProvider>
  // </React.StrictMode>

  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <main className="light text-foreground bg-background">
          <App />
        </main>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
