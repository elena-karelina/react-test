import { createRoot } from 'react-dom/client';

import './assets/styles/global.css';
import { RouterProvider } from 'react-router-dom';

import router from './App';
import Layout from './components/layout/layout';

createRoot(document.getElementById('root')).render(
  <Layout>
    <RouterProvider router={router} />
  </Layout>,
);
