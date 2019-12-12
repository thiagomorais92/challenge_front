import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux';
import LoginPage from './LoginPage/components/LoginPage';
import ClientePage from './ClientePage/components/ClientePage';
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery/dist/jquery.min';
import axios from 'axios';

axios.interceptors.request.use((config) => {
  config.headers.common["Content-Type"] = 'application/json;charset=UTF-8';
  config.headers.common["Access-Control-Allow-Origin"] = '*';
  if(window.sessionStorage.getItem("token")){
    config.headers.common["Authorization"] = window.sessionStorage.getItem("token"); 
  }

  return config;
});


function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <Router>
          <Route path="/">
              <LoginPage/>
            </Route>
            <Route path="/client-page">
              <ClientePage/>
            </Route>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
