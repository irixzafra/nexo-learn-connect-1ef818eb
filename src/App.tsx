
import AppRouter from './routes/AppRouter';
import AppProviders from './providers/AppProviders';

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
