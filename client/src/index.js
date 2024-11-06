import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { PropertyProvider } from "./context/PropertyContext"; // Import PropertyProvider
import { AuthProvider } from "./context/AuthContext"; // Import your custom AuthProvider

ReactDOM.render(
  <AuthProvider> {/* Replacing Auth0Provider with your custom AuthProvider */}
    <PropertyProvider> 
      <Router>
        <App />
      </Router>
    </PropertyProvider>
  </AuthProvider>,
  document.getElementById('root')
);