import { Routes, Route } from 'react-router-dom';
import { HomePage } from './home';
import { DetailUserPage } from './detail-user';

export const RouterPage = () => {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="user/:id" element={<DetailUserPage />} />
    </Routes>
  )
}


