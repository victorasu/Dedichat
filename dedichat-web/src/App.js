import './App.css';
import {AuthenticatedApp} from './components/AuthenticatedApp';
import {UnauthenticatedApp} from './components/UnauthenticatedApp';
import {useAuth} from './hooks/useAuth'

function App() {
  const {user} = useAuth();

  return (
    <div className="container">
      <h1>💬 Dedichat 💬</h1>
      {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
    </div>
  );
}

export default App;
