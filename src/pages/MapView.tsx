import React from 'react';
import Navbar from '../components/Navbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
export default function MapView() {
  // Mock supplier locations
  const suppliers = [{
    id: 1,
    name: 'Supplier A',
    lat: 14.5995,
    lng: 120.9842,
    products: 24
  }, {
    id: 2,
    name: 'Supplier B',
    lat: 14.6091,
    lng: 121.0223,
    products: 18
  }, {
    id: 3,
    name: 'Supplier C',
    lat: 14.5547,
    lng: 121.0244,
    products: 32
  }];
  // Fix for default marker icon issue in react-leaflet
  const defaultIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  return <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Supplier Map</h1>
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <div className="h-[600px] w-full">
            <MapContainer center={[14.5995, 120.9842]} zoom={12} style={{
            height: '100%',
            width: '100%'
          }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
              {suppliers.map(supplier => <Marker key={supplier.id} position={[supplier.lat, supplier.lng]} icon={defaultIcon}>
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{supplier.name}</h3>
                      <p className="text-sm">
                        Products available: {supplier.products}
                      </p>
                      <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-800">
                        View Products
                      </button>
                    </div>
                  </Popup>
                </Marker>)}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>;
}