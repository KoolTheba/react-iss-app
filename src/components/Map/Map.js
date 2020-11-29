import {
    MapContainer,
    Marker,
    TileLayer,
    Popup
} from 'react-leaflet'

// styles
import './Map.css'

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
            You're here
            <br/>
            Lat: {props.lat}
            <br/>
            Lon: {props.lon}
            </Popup>
        </Marker>
        </MapContainer>
    )
}