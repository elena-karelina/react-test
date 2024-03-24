import { createRoot } from 'react-dom/client';

import './index.css';
import { RouterProvider } from 'react-router-dom';

import { router } from './app/App';
import { Layout } from './app/layout/Layout';

createRoot(document.getElementById('root')).render(
  <Layout>
    <RouterProvider router={router} />
  </Layout>,
);
