import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

const GRENOBLE_CENTER = [45.1885, 5.7245]

export function MapView({ users, onSelectUser, selectedUser, onOpenProfile }) {
  return (
    <div className="relative h-[62vh] overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-epolia-purple/10">
      <MapContainer center={GRENOBLE_CENTER} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {users.map((user) => (
          <Marker
            key={user.id}
            position={[user.lat, user.lng]}
            eventHandlers={{
              click: () => {
                if (typeof onSelectUser === 'function') {
                  onSelectUser(user.id)
                }
              }
            }}
          />
        ))}
      </MapContainer>

      {selectedUser ? (
        <article className="pointer-events-auto absolute inset-x-3 bottom-3 z-[500] overflow-hidden rounded-xl bg-white p-3 shadow-sm ring-1 ring-epolia-purple/10">
          <div className="flex items-center gap-3">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="h-14 w-14 rounded-full object-cover"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-epolia-purple">{selectedUser.name}</p>
              <p className="truncate text-xs text-epolia-muted">{selectedUser.skill}</p>
              <p className="text-xs font-semibold text-epolia-orange">{selectedUser.price}€/h</p>
            </div>
            <button
              type="button"
              onClick={() => onOpenProfile?.(selectedUser)}
              className="rounded-lg bg-epolia-orange px-3 py-2 text-xs font-semibold text-white"
            >
              Voir
            </button>
          </div>
        </article>
      ) : null}
    </div>
  )
}
