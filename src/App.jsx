import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './app/layout/Layout';
import { Profile } from './pages/profile/profile';
import { Login } from './pages/login/login';

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
