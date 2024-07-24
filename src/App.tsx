import { CssBaseline } from '@mui/material';
import { GlobalStore } from '@store';
import { Notifications } from '@UI';
import { MainLayout } from './components/MainLayout';

function App() {
  return (
    <GlobalStore>
      <CssBaseline />
      <MainLayout />
      <Notifications />
    </GlobalStore>
  );
}

export default App;
