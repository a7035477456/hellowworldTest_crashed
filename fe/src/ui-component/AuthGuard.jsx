import { Navigate, useLocation } from 'react-router-dom';

const LOGIN_FLAG_KEY = 'vsingles-logged-in';

// ==============================|| AUTH GUARD ||============================== //
// Redirects to login if user is not logged in (so Back after logout doesn't show dashboard).

export default function AuthGuard({ children }) {
  const location = useLocation();
  const isLoggedIn = typeof window !== 'undefined' && sessionStorage.getItem(LOGIN_FLAG_KEY);

  if (!isLoggedIn) {
    return <Navigate to="/pages/login" replace state={{ from: location }} />;
  }

  return children;
}
