import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './layout/Layout';

import { Login } from '../pages/login/login';
import { Profile } from '../pages/profile/profile';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
