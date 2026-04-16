import { MapContainer, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CrimeCase } from '../data/mockData';
import { Icon } from 'leaflet';

const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [28, 42],
  iconAnchor: [14, 42],
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
      <div className="map-header">
        <div>
          <h2>Hiển thị dữ liệu trên bản đồ</h2>
          <p style={{ margin: '10px 0 0', color: '#475569', maxWidth: 560 }}>
            Xem vị trí vụ việc, phân tích khu vực nguy cơ cao và tra cứu thông tin nhanh trên bản đồ TP.HCM.
          </p>
        </div>
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#ef4444' }} /> Trộm cắp
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#f59e0b' }} /> Cướp giật
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#3b82f6' }} /> Gây rối trật tự
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#10b981' }} /> Ma túy
          </div>
        </div>
      </div>

      <MapContainer center={center} zoom={11} style={{ width: '100%', minHeight: '520px', borderRadius: 20, overflow: 'hidden' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap, &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {cases.map((item) => (
          <Marker position={[item.lat, item.lng]} icon={markerIcon} key={item.id}>
            <Popup>
              <strong>{item.crimeType}</strong>
              <div>{new Date(item.date).toLocaleString('vi-VN')}</div>
              <div>{item.address}</div>
              <div>{item.district} / {item.ward}</div>
              <div>Trạng thái: {item.status}</div>
            </Popup>
          </Marker>
        ))}

        {cases.map((item) => (
          <CircleMarker
            key={`${item.id}-heat`}
            center={[item.lat, item.lng]}
            radius={20}
            pathOptions={{ color: heatColors[item.crimeType] || '#2563eb', fillOpacity: 0.22, weight: 2 }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default CrimeMap;
