import { ChangeEvent } from 'react';
import { CrimeCase, Person } from '../data/mockData';

type Props = {
  cases: CrimeCase[];
  persons: Person[];
  filters: {
    crimeType: string;
    district: string;
    status: string;
    timeRange: string;
  };
  onFilterChange: (filters: Props['filters']) => void;
};

const statusClass = (status: string) => {
  if (status === 'Đã xử lý') return 'badge closed';
  if (status === 'Đang điều tra') return 'badge open';
  return 'badge pending';
};

const CrimeTable = ({ cases, filters, onFilterChange, persons }: Props) => {
  const crimeTypes = ['Tất cả', 'Trộm cắp', 'Cướp giật', 'Gây rối trật tự', 'Mua bán trái phép chất ma túy'];
  const districts = ['Tất cả', 'Quận 1', 'Quận 5', 'Quận Tân Bình', 'Quận 7'];
  const statuses = ['Tất cả', 'Đang điều tra', 'Đã xử lý', 'Chưa xử lý'];
  const timeRanges = ['Tất cả', '2024', '2025'];

  const totalCases = cases.length;
  const uniqueDistricts = Array.from(new Set(cases.map((item) => item.district))).length;

  const handleChange = (field: keyof Props['filters']) => (event: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, [field]: event.target.value });
  };

  return (
    <div className="section-card">
      <div className="table-title-bar">
        <div>
          <h2>Quản lý vụ việc phạm tội</h2>
          <p style={{ margin: '10px 0 0', color: '#475569', maxWidth: 620 }}>
            Xem danh sách vụ việc, lọc theo loại, quận, thời gian và trạng thái xử lý.
          </p>
        </div>
        <div className="summary-pill">Số vụ hiện tại: {totalCases}</div>
      </div>

      <div className="filters">
        <select value={filters.crimeType} onChange={handleChange('crimeType')}>
          {crimeTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select value={filters.district} onChange={handleChange('district')}>
          {districts.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
        <select value={filters.status} onChange={handleChange('status')}>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <select value={filters.timeRange} onChange={handleChange('timeRange')}>
          {timeRanges.map((range) => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      <div className="table-section">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Mã vụ việc</th>
                <th>Loại tội phạm</th>
                <th>Thời gian</th>
                <th>Địa điểm</th>
                <th>Quận / Phường</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.crimeType}</td>
                  <td>{new Date(item.date).toLocaleString('vi-VN')}</td>
                  <td>{item.address}</td>
                  <td>{item.district} / {item.ward}</td>
                  <td><span className={statusClass(item.status)}>{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3>Liên kết đối tượng</h3>
        <p style={{ color: '#475569', marginBottom: 16 }}>
          Danh sách một số đối tượng liên quan đến vụ việc để dễ theo dõi.
        </p>
        <ul style={{ paddingLeft: 18, margin: 0, color: '#334155' }}>
          {persons.slice(0, 5).map((person) => (
            <li key={person.id} style={{ marginBottom: 8 }}>
              {person.name} ({person.role}) liên quan vụ {person.caseId}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrimeTable;
