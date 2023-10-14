import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import '../css/findus.css'
import 'leaflet/dist/leaflet.css'

type LatLngTuple = [number, number]

const FindUs = (): JSX.Element => {
    const markers = [
        {
            geocode: [59.237993225168175, 18.191430248174676] as LatLngTuple,
            popUp: 'Solkraftsvägen',
        },
    ]

    const customIcon = new Icon({
        iconUrl: require('../assets/marker.png'),
        iconSize: [38, 38],
    })

    return (
        <div className="findus-container">
            <div className="findus-content">
                <h3>
                    Välkommen till Kjellman Auto, din pålitliga bilhandlare i
                    Stockholm! För att hitta till oss kan du enkelt följa
                    adressen som finns angiven här nedan. Med bil tar det endast
                    cirka 20 minuter från centrala Stockholm att nå vår
                    anläggning. Vi ser fram emot att hjälpa dig hitta din
                    perfekta bil!
                </h3>
            </div>
            <MapContainer
                center={[59.237993225168175, 18.191430248174676]}
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
