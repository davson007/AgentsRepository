import { Navigate } from 'react-router-dom';
import { useAuth } from '@/components/auth-provider';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="login" />;
  }

  return <>{children}</>;
}