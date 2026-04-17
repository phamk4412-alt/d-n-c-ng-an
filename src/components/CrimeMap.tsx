import { useState } from 'react';
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

const islandMarkers = [
  {
    id: 'HoangSa',
    name: 'Hoàng Sa',
    description: 'Quần đảo Hoàng Sa - Việt Nam',
    lat: 16.5,
    lng: 112.4,
    color: '#d97706',
  },
  {
    id: 'TruongSa',
    name: 'Trường Sa',
    description: 'Quần đảo Trường Sa - Việt Nam',
    lat: 9.75,
    lng: 115.5,
    color: '#7c3aed',
  },
];

const tileProviders = {
  osm: {
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    subdomains: 'abc',
  },
  carto: {
    name: 'Carto Voyager',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap, &copy; CARTO',
    subdomains: 'abcd',
  },
};

const vietnamBounds: [[number, number], [number, number]] = [[0.5, 102.0], [24.5, 117.5]];

const CrimeMap = ({ cases }: { cases: CrimeCase[] }) => {
  const [provider, setProvider] = useState<'osm' | 'carto'>('osm');
  const [showIslands, setShowIslands] = useState(false);
  const center: [number, number] = showIslands ? [12.5, 113.0] : [10.7767, 106.7009];
  const zoom = showIslands ? 5 : 11;

  return (
    <div className="section-card map-card">
      <div className="map-header">
        <div>
          <h2>Hiển thị dữ liệu trên bản đồ</h2>
          <p style={{ margin: '10px 0 0', color: '#475569', maxWidth: 560 }}>
            Bản đồ giới hạn chỉ trong phạm vi Việt Nam, gồm đất liền và quần đảo Hoàng Sa - Trường Sa theo quan điểm Việt Nam.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={() => setShowIslands(!showIslands)}
            style={{
              border: 'none',
              borderRadius: 14,
              padding: '12px 16px',
              background: '#1d4ed8',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {showIslands ? 'Quay lại TP.HCM' : 'Hiển thị HS-TS'}
          </button>
          <select
            value={provider}
            onChange={(event) => setProvider(event.target.value as 'osm' | 'carto')}
            style={{
              borderRadius: 14,
              padding: '12px 14px',
              border: '1px solid #cbd5e1',
              background: 'white',
              color: '#0f172a',
            }}
          >
            <option value="osm">OpenStreetMap</option>
            <option value="carto">Carto Voyager</option>
          </select>
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
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        maxBounds={vietnamBounds}
        maxBoundsViscosity={0.95}
        minZoom={5}
        maxZoom={11}
        style={{ width: '100%', minHeight: '520px', borderRadius: 20, overflow: 'hidden' }}
      >
        <TileLayer
          attribution={tileProviders[provider].attribution}
          url={tileProviders[provider].url}
          subdomains={tileProviders[provider].subdomains}
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

        {islandMarkers.map((island) => (
          <Marker position={[island.lat, island.lng]} icon={markerIcon} key={island.id}>
            <Popup>
              <strong>{island.name}</strong>
              <div>{island.description}</div>
              <div>Việt Nam</div>
            </Popup>
          </Marker>
        ))}

        {islandMarkers.map((island) => (
          <CircleMarker
            key={`${island.id}-label`}
            center={[island.lat, island.lng]}
            radius={28}
            pathOptions={{ color: island.color, fillOpacity: 0.18, weight: 3 }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default CrimeMap;
