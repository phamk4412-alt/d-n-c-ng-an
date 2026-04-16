import { useMemo, useState } from 'react';
import { cases, persons } from './data/mockData';
import CrimeTable from './components/CrimeTable';
import Dashboard from './components/Dashboard';
import CrimeMap from './components/CrimeMap';
import ReportExport from './components/ReportExport';
import './App.css';

const App = () => {
  const [activePage, setActivePage] = useState<'dashboard' | 'cases' | 'map' | 'reports'>('dashboard');
  const [filters, setFilters] = useState({
    crimeType: 'Tất cả',
    district: 'Tất cả',
    status: 'Tất cả',
    timeRange: 'Tất cả',
  });

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      if (filters.crimeType !== 'Tất cả' && item.crimeType !== filters.crimeType) return false;
      if (filters.district !== 'Tất cả' && item.district !== filters.district) return false;
      if (filters.status !== 'Tất cả' && item.status !== filters.status) return false;
      if (filters.timeRange !== 'Tất cả') {
        const year = new Date(item.date).getFullYear();
        if (filters.timeRange === '2024' && year !== 2024) return false;
        if (filters.timeRange === '2025' && year !== 2025) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Hệ thống phân tích tội phạm TP.HCM</h1>
          <p>Quản lý vụ việc, trực quan hóa trên bản đồ, dashboard phân tích và xuất báo cáo.</p>
        </div>
        <nav className="app-nav">
          <button onClick={() => setActivePage('dashboard')} className={activePage === 'dashboard' ? 'active' : ''}>Dashboard</button>
          <button onClick={() => setActivePage('cases')} className={activePage === 'cases' ? 'active' : ''}>Vụ việc</button>
          <button onClick={() => setActivePage('map')} className={activePage === 'map' ? 'active' : ''}>Bản đồ</button>
          <button onClick={() => setActivePage('reports')} className={activePage === 'reports' ? 'active' : ''}>Báo cáo</button>
        </nav>
      </header>

      <main className="content-area">
        {activePage === 'dashboard' && <Dashboard cases={filteredCases} />}
        {activePage === 'cases' && (
          <CrimeTable
            cases={filteredCases}
            filters={filters}
            onFilterChange={setFilters}
            persons={persons}
          />
        )}
        {activePage === 'map' && <CrimeMap cases={filteredCases} />}
        {activePage === 'reports' && <ReportExport cases={filteredCases} />}
      </main>

      <footer className="app-footer">
        <span>Phiên bản demo dành cho nghiên cứu và học tập, dữ liệu mô phỏng.</span>
      </footer>
    </div>
  );
};

export default App;
