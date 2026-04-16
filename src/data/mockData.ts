export type CrimeCase = {
  id: string;
  crimeType: string;
  date: string;
  address: string;
  district: string;
  ward: string;
  description: string;
  status: string;
  lat: number;
  lng: number;
};

export type Person = {
  id: string;
  name: string;
  birthYear: number;
  address: string;
  role: string;
  caseId: string;
};

export const cases: CrimeCase[] = [
  {
    id: 'V001',
    crimeType: 'Trộm cắp',
    date: '2024-01-15T08:30:00',
    address: '123 đường Lê Lợi',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    description: 'Kẻ gian đột nhập nhà dân lấy tài sản giá trị.',
    status: 'Đang điều tra',
    lat: 10.7765,
    lng: 106.7009,
  },
  {
    id: 'V002',
    crimeType: 'Cướp giật',
    date: '2024-02-03T19:15:00',
    address: 'Ngã tư Nguyễn Văn Cừ - Cầu vượt',
    district: 'Quận 5',
    ward: 'Phường 3',
    description: 'Nạn nhân bị giật túi xách trên đường.',
    status: 'Đã xử lý',
    lat: 10.7549,
    lng: 106.6687,
  },
  {
    id: 'V003',
    crimeType: 'Gây rối trật tự',
    date: '2025-03-20T22:40:00',
    address: 'Công viên 23/9',
    district: 'Quận 1',
    ward: 'Phường Bến Thành',
    description: 'Nhóm thanh niên ẩu đả làm loạn khu vực.',
    status: 'Đang điều tra',
    lat: 10.7772,
    lng: 106.6990,
  },
  {
    id: 'V004',
    crimeType: 'Mua bán trái phép chất ma túy',
    date: '2024-04-11T14:05:00',
    address: 'Chợ Tân Bình',
    district: 'Quận Tân Bình',
    ward: 'Phường 2',
    description: 'Phát hiện giao dịch ma túy tại chợ.',
    status: 'Đã xử lý',
    lat: 10.7958,
    lng: 106.6519,
  },
  {
    id: 'V005',
    crimeType: 'Trộm cắp',
    date: '2025-05-28T05:50:00',
    address: 'Khu phố 5, Quận 7',
    district: 'Quận 7',
    ward: 'Phường Tân Thuận Đông',
    description: 'Kẻ gian lấy trộm xe máy của người dân.',
    status: 'Chưa xử lý',
    lat: 10.7591,
    lng: 106.7068,
  },
];

export const persons: Person[] = [
  { id: 'P001', name: 'Nguyễn Văn A', birthYear: 1990, address: 'Quận 1', role: 'Nghi phạm', caseId: 'V001' },
  { id: 'P002', name: 'Trần Thị B', birthYear: 1985, address: 'Quận 5', role: 'Nạn nhân', caseId: 'V002' },
  { id: 'P003', name: 'Lê Văn C', birthYear: 2001, address: 'Quận 1', role: 'Nghi can', caseId: 'V003' },
  { id: 'P004', name: 'Phạm Thị D', birthYear: 1995, address: 'Tân Bình', role: 'Nghi phạm', caseId: 'V004' },
  { id: 'P005', name: 'Võ Văn E', birthYear: 1998, address: 'Quận 7', role: 'Nghi phạm', caseId: 'V005' },
];
