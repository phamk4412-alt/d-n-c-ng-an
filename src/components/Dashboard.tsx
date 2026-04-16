import { CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart, Cell } from 'recharts';
import { CrimeCase } from '../data/mockData';

const colorMap: Record<string, string> = {
  'Trộm cắp': '#ef4444',
  'Cướp giật': '#f59e0b',
  'Gây rối trật tự': '#3b82f6',
  'Mua bán trái phép chất ma túy': '#10b981',
};

const Dashboard = ({ cases }: { cases: CrimeCase[] }) => {
  const totalCases = cases.length;
  const popularDistricts = Object.entries(
    cases.reduce((acc, item) => ({ ...acc, [item.district]: (acc[item.district] || 0) + 1 }), {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const crimeTypeCount = Object.entries(
    cases.reduce((acc, item) => ({ ...acc, [item.crimeType]: (acc[item.crimeType] || 0) + 1 }), {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const timeTrend = Object.entries(
    cases.reduce((acc, item) => {
      const month = new Date(item.date).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit' });
      return { ...acc, [month]: (acc[month] || 0) + 1 };
    }, {} as Record<string, number>)
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const districtHeat = popularDistricts.map((item) => ({ ...item, color: item.value > 1 ? '#dc2626' : '#f59e0b' }));

  return (
    <div className="section-card">
      <h2>Dashboard phân tích</h2>
      <div className="grid-2">
        <div className="section-card" style={{ padding: 18 }}>
          <h3>Tổng số vụ việc</h3>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: '#1d4ed8', marginTop: 14 }}>{totalCases}</div>
        </div>
        <div className="section-card" style={{ padding: 18 }}>
          <h3>Top khu vực có nhiều vụ việc</h3>
          <ul>
            {popularDistricts.map((item) => (
              <li key={item.name}>{item.name}: {item.value} vụ</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid-2">
        <div className="section-card">
          <h3>Số vụ theo loại tội phạm</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={crimeTypeCount} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb">
                {crimeTypeCount.map((entry) => (
                  <Cell key={entry.name} fill={colorMap[entry.name] || '#2563eb'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="section-card">
          <h3>Loại tội phạm phổ biến</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={crimeTypeCount} dataKey="value" nameKey="name" outerRadius={110} fill="#2563eb" label>
                {crimeTypeCount.map((entry) => (
                  <Cell key={entry.name} fill={colorMap[entry.name] || '#2563eb'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="section-card">
        <h3>Xu hướng tội phạm theo thời gian</h3>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={timeTrend} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="section-card">
        <h3>Heatmap khu vực tội phạm</h3>
        <div className="grid-2">
          {districtHeat.map((item) => (
            <div key={item.name} style={{ padding: 14, borderRadius: 14, background: '#f8fafc' }}>
              <strong>{item.name}</strong>
              <p style={{ margin: '10px 0 0', color: item.color }}>{item.value > 1 ? 'Cao' : 'Trung bình'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
