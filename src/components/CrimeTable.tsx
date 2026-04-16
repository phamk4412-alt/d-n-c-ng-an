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

const CrimeTable = ({ cases, filters, onFilterChange, persons }: Props) => {
  const crimeTypes = ['Tất cả', 'Trộm cắp', 'Cướp giật', 'Gây rối trật tự', 'Mua bán trái phép chất ma túy'];
  const districts = ['Tất cả', 'Quận 1', 'Quận 5', 'Quận Tân Bình', 'Quận 7'];
  const statuses = ['Tất cả', 'Đang điều tra', 'Đã xử lý', 'Chưa xử lý'];
  const timeRanges = ['Tất cả', '2024', '2025'];

  const handleChange = (field: keyof Props['filters']) => (event: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, [field]: event.target.value });
  };

  return (
    <div className="section-card">
      <h2>Quản lý vụ việc phạm tội</h2>
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
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 18 }}>
        <h3>Liên kết đối tượng</h3>
        <ul>
          {persons.slice(0, 5).map((person) => (
            <li key={person.id}>{person.name} ({person.role}) liên quan vụ {person.caseId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrimeTable;
