import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import '../css/findus.css'
import 'leaflet/dist/leaflet.css'

type LatLngTuple = [number, number]

const FindUs = (): JSX.Element => {
    const markers = [
        {
            geocode: [58.93180021553279, 17.935663781692448] as LatLngTuple,
            popUp: 'Teknikervägen 1, 149 45 Nynäshamn',
        },
    ]

    const customIcon = new Icon({
        iconUrl: require('../assets/marker.png'),
        iconSize: [38, 38],
    })

    return (
        <div className="findus-container">
            <div className="findus-content">
                <h1>Välkommen till Kjellman Auto!</h1>
                <p>
                    För att hitta till oss kan du enkelt följa
                    adressen som finns angiven ovan. Med bil tar det endast
                    cirka 30 minuter från centrala Stockholm att nå vår
                    anläggning. Vi ser fram emot att hjälpa dig hitta din
                    perfekta bil.
                </p>
            </div>
            <MapContainer
                center={[58.93180021553279, 17.935663781692448]}
                zoom={14}
                scrollWheelZoom={false}
                style={{ zIndex: 0 }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.geocode}
                        icon={customIcon}
                    >
                        <Popup>{marker.popUp}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default FindUs
