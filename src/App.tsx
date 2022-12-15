import './App.css';
import { Box } from '@mui/material';
import { ArticlePage } from './pages/ArticlePage';
import { BrowserRouter } from 'react-router-dom';
import { RoutingTable } from './pages/RoutingTable';

function App() {
  return (
    <BrowserRouter>
      <RoutingTable/>
    </BrowserRouter>
  );
}

export default App;
