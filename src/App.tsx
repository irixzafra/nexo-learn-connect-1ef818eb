
import React from 'react';
import './App.css';
import AppRoutes from './routes';
import AppProviders from './providers/AppProviders';

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
