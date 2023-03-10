import './App.css';
import Header from './components/Header';
import PageTitle from './components/PageTitle';
import TimeReport from './components/TimeReport'
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Header />
      <div className="container">
        <PageTitle />
        <TimeReport />
      </div>
    </UserProvider>
  );
}

export default App;
