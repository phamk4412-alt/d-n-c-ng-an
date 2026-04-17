import { cases } from './data/mockData';
import CrimeMap from './components/CrimeMap';
import './App.css';

const App = () => {
  return (
    <div className="app-shell">
      <main className="content-area" style={{ padding: '32px 24px', width: '100%', maxWidth: 1360, margin: '0 auto' }}>
        <CrimeMap cases={cases} />
      </main>
    </div>
  );
};

export default App;
