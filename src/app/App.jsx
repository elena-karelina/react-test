import { createBrowserRouter } from 'react-router-dom';

import { Login } from '../pages/login/login';
import { Profile } from '../pages/profile/profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]);
