
import App from '@/App.tsx';
import '@/index.scss';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import AppProvider from '@/context/AppProvider';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_API;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>
)
