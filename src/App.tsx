import './App.css';
import { Box } from '@mui/material';
import { ArticlePage } from './pages/ArticlePage';
import { BrowserRouter } from 'react-router-dom';
import { RoutingTable } from './pages/RoutingTable';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RoutingTable/>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
