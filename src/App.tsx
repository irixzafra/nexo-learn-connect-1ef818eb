
import { useEffect } from 'react';
import { Routes } from './routes';
import './App.css';
import { Toaster } from 'sonner';
import AppProviders from './providers/AppProviders';

function App() {
  useEffect(() => {
    console.log("App initialized - if you need to make a user admin, you can use window.makeUserAdmin('admin@nexo.com') in the console");
  }, []);

  return (
    <AppProviders>
      <Toaster position="top-right" />
      <Routes />
    </AppProviders>
  );
}

export default App;
