import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { CarFront, Star, MapPin, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

// Marker matching the new Emerald theme
const MarkerIcon = ({ price }: { price: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', marginTop: '-24px' }} className="group">
        <div style={{
            background: 'var(--clr-white)',
            borderRadius: 'var(--radius-full)',
            width: 34, height: 34,
            border: '2px solid var(--clr-primary)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--clr-primary)',
            zIndex: 10
        }}>
            <CarFront size={16} strokeWidth={2.5} />
        </div>
        <div style={{
            background: 'var(--clr-white)',
            marginTop: '-4px',
            padding: '2px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--clr-primary)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 20
        }}>
            <span style={{ color: 'var(--clr-text)', fontWeight: 700, fontSize: '11px', whiteSpace: 'nowrap' }}>{price}</span>
        </div>
    </div>
);

export default function InteractiveMap({ schools = [] }: { schools?: any[] }) {
    useEffect(() => {
        // Fix Leaflet's default icon paths
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
    }, []);

    const centerPosition: [number, number] = [34.7, 9.5375]; // Tunisia Center
    const defaultZoom = 7;

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 0 }}>
            <MapContainer
                center={centerPosition}
                zoom={defaultZoom}
                scrollWheelZoom={true}
                zoomControl={false}
                style={{ width: '100%', height: '100%', zIndex: 0 }}
                bounds={L.latLngBounds([37.5, 7.5], [30.2, 11.6])}
                maxBounds={L.latLngBounds([37.5, 7.5], [30.2, 11.6])}
                maxBoundsViscosity={1.0}
                minZoom={6}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <ZoomControl position="topleft" />

                {schools.map((marker, idx) => {
                    const displayPrice = marker.price_per_hour || marker.price;
                    const iconHtml = renderToStaticMarkup(<MarkerIcon price={displayPrice + " DT"} />);

                    return (
                        <Marker
                            key={marker.id || idx}
                            position={[marker.lat, marker.lng]}
                            icon={new L.DivIcon({
                                html: iconHtml,
                                className: "bg-transparent border-none outline-none",
                                iconSize: [60, 60],
                                iconAnchor: [30, 30],
                                popupAnchor: [0, -20],
                            })}
                        >
                            <Popup closeButton={false} minWidth={280} className="custom-popup">
                                <div className="card" style={{ padding: 0, overflow: 'hidden', width: 280, display: 'flex', flexDirection: 'column', border: 'none' }}>
                                    <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <h3 style={{ fontSize: '1rem', margin: 0, lineHeight: 1.2 }}>{marker.name || marker.title}</h3>
                                            <span style={{ color: 'var(--clr-primary)', fontWeight: 800, fontSize: '1.25rem' }}>
                                                {displayPrice}<span style={{ fontSize: '0.75rem', color: 'var(--clr-text-light)', fontWeight: 500 }}>DT/h</span>
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', color: '#EAB308', fontSize: '0.875rem', fontWeight: 600 }}>
                                            <Star size={16} fill="currentColor" />
                                            <span>{marker.rating}</span>
                                            <span style={{ color: 'var(--clr-text-light)', fontWeight: 400 }}>({marker.reviews_count || marker.reviews} avis)</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-1)', color: 'var(--clr-text-light)' }}>
                                            <MapPin size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                                            <span style={{ fontSize: '0.875rem' }}>{marker.address || marker.city}</span>
                                        </div>
                                    </div>
                                    <div style={{ background: 'var(--clr-surface)', padding: 'var(--space-3)', borderTop: '1px solid var(--clr-border)' }}>
                                        <button className="btn btn-primary" style={{ width: '100%', padding: 'var(--space-3)' }}>
                                            Voir détails <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
