
import { useEffect } from 'react';
import { Routes } from './routes';
import './App.css';
import { Toaster } from 'sonner';
import './utils/consoleUtils'; // Import the console utilities

function App() {
  useEffect(() => {
    console.log("App initialized - if you need to make a user admin, you can use window.makeUserAdmin('admin@nexo.com') in the console");
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <Routes />
    </>
  );
}

export default App;
