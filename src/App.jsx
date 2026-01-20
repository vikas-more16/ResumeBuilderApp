import { AuthProvider } from './context/AuthContext';
import RootNavigation from './Navigation/RootNavigation';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
