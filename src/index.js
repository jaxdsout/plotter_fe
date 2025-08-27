import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from './store/index';
import './styles.css';

import Activate from './pages/Activate';
import ClientList from './pages/ClientList';
import ConfirmPassword from './pages/ConfirmPassword';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import NetEffective from './pages/NetEffective';
import ResetPassword from './pages/ResetPassword';
import SignUpForm from './pages/SignUp';

import Footer from './components/partials/Footer';
import Navbar from './components/partials/Navbar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router basename=''>
        <div className='root'>
          <header>
            <Navbar />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup/" element={<SignUpForm />} />
              <Route path="/reset-password/" element={<ResetPassword />} />
              <Route path="/reset-password/confirm/:uid/:token" element={<ConfirmPassword />} />
              <Route path="/verify/:uid/:token" element={<Activate />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/list/:uuid/" element={<ClientList />} />
              <Route path="/net-effective" element={<NetEffective />} />
              <Route path="/dashboard/" element={<Dashboard />}>
                <Route path="home" element={<Dashboard />} />
                <Route path="clients" element={<Dashboard />} />
                <Route path="lists" element={<Dashboard />} />
                <Route path="deals" element={<Dashboard />} />
                <Route path="search" element={<Dashboard />} />
                <Route path="cards" element={<Dashboard />} />
              </Route>
            </Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    </PersistGate>
  </Provider>
);

