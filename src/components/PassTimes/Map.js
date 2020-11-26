import {
    MapContainer,
    Marker,
    TileLayer,
    Popup
} from 'react-leaflet'

export default function Map (props) {

    const position = [props.lat, props.lon]

    return (
        <MapContainer center={position} zoom={2} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
            <Popup>
            You're HERE
            </Popup>
        </Marker>
        </MapContainer>
    )
}