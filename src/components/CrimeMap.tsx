import { MapContainer, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CrimeCase } from '../data/mockData';
import { Icon, PointExpression } from 'leaflet';

const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
}) as Icon;

const heatColors: Record<string, string> = {
  'Trộm cắp': '#ef4444',
  'Cướp giật': '#f59e0b',
  'Gây rối trật tự': '#3b82f6',
  'Mua bán trái phép chất ma túy': '#10b981',
};

const CrimeMap = ({ cases }: { cases: CrimeCase[] }) => {
  const center: [number, number] = [10.7767, 106.7009];

  return (
    <div className="section-card map-card">
      <h2>Hiển thị dữ liệu trên bản đồ</h2>
      <MapContainer center={center} zoom={11} style={{ width: '100%', minHeight: '520px', borderRadius: 18, overflow: 'hidden' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cases.map((item) => (
          <Marker position={[item.lat, item.lng]} icon={markerIcon} key={item.id}>
            <Popup>
              <strong>{item.crimeType}</strong>
              <div>{new Date(item.date).toLocaleString('vi-VN')}</div>
              <div>{item.address}</div>
              <div>{item.status}</div>
            </Popup>
          </Marker>
        ))}
        {cases.map((item) => (
          <CircleMarker
            key={`${item.id}-heat`}
            center={[item.lat, item.lng]}
            radius={18}
            pathOptions={{ color: heatColors[item.crimeType] || '#2563eb', fillOpacity: 0.18 }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default CrimeMap;
