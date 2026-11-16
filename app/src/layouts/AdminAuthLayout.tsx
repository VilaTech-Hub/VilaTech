import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

export default function AdminAuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
