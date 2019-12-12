import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux';
import LoginPage from './LoginPage/components/LoginPage';
import ClientePage from './ClientePage/components/ClientePage';
import store from './store';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery/dist/jquery.min';
import axios from 'axios';

axios.interceptors.response.use((response) => {
  
  return response;
},(error) => {
  // You can even test for a response code 
  // and try a new request before rejecting the promise
   if (error.response.status === 401) {     
     
   }
  return Promise.reject(error);
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
