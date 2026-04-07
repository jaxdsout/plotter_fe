import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";
import 'semantic-ui-css/semantic.min.css';
import { persistor, store } from './store/index';
import './styles.css';


import Activate from "./pages/auth/Activate";
import ConfirmPassword from './pages/auth/ConfirmPassword';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import SignUpForm from './pages/auth/SignUp';
import ClientList from './pages/clientList/ClientList';
import Dashboard from './pages/dashboard/Dashboard';
import Landing from './pages/home/Landing';

import Footer from './components/partials/Footer';
import Navbar from './components/partials/Navbar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router basename=''>
        <div className='root'>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup/" element={<SignUpForm />} />
            <Route path="/reset-password/" element={<ResetPassword />} />
            <Route path="/reset-password/confirm/:uid/:token" element={<ConfirmPassword />} />
            <Route path="/verify/:uid/:token" element={<Activate />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/list/:uuid/" element={<ClientList />} />
            <Route path="/dashboard/" element={<Dashboard />}>
              <Route path="home" element={<Dashboard />} />
              <Route path="clients" element={<Dashboard />} />
              <Route path="lists" element={<Dashboard />} />
              <Route path="deals" element={<Dashboard />} />
              <Route path="search" element={<Dashboard />} />
              <Route path="cards" element={<Dashboard />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </PersistGate>
  </Provider>
);

