import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiBaseUrl } from '../api/apiUrl'
import { apiEndpoints } from '../api/endpoints'
import { routePaths } from '../utils/routePaths'
import axios from 'axios'
import Hero from '../components/hero'
import logo from '../assets/showroom.jpg'
import Loader from '../components/loader'
import FormInput from '../components/formInput'

const Inventory = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [initialData, setInitialData] = useState([
        {
            header: '',
            model: '',
            make: '',
            milage: '',
            plateNumber: '',
            modelYear: '',
            gearBox: '',
            propellent: '',
            id: 0,
            price: '',
            color: '',
            images: [{ fileName: '' }],
        },
    ])

    useEffect(() => {
        setLoading(true)
        axios
            .get(apiBaseUrl + apiEndpoints.getAll)
            .then((response) => {
                setError(false)
                console.log(response.data.data)
                setInitialData(response.data.data)
            })
            .finally(() => {
                setLoading(false)
            })
            .catch(() => {
                setError(true)
            })
    }, [])

    return (
        <>
            <Hero imgSrc={logo} />
            <div className="inventory-input">
                <FormInput label={'Sök bland våra bilar'} id={'search'} />
            </div>
            <div className="inventory-main-container">
                <div className="inventory-grid-container">
                    {loading ? (
                        <>
                            <Loader />
                        </>
                    ) : (
                        <>
                            {error ? (
                                <>
                                    <h1>Kunde inte hämta lagret</h1>
                                </>
                            ) : (
                                <>
                                    {initialData.map((cars) => (
                                        <div className="inventory">
                                            <Link
                                                to={`${routePaths.inventory}/${cars.id}`}
                                            >
                                                <div className="inventory-container">
                                                    <img
                                                        src={
                                                            cars.images?.[0]
                                                                ?.fileName
                                                        }
                                                        alt={'preview'}
                                                        className="inventory-image"
                                                    />
                                                </div>
                                                <div className="inventory-content">
                                                    <h2 className="inventory-title">
                                                        {cars.header}
                                                    </h2>
                                                    <div className="inventory-facts-container">
                                                        <div className="inventory-description">
                                                            <span>
                                                                {cars.modelYear}
                                                            </span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>
                                                                {cars.milage}{' '}
                                                                mil
                                                            </span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>
                                                                {cars.gearBox}
                                                            </span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>
                                                                {
                                                                    cars.propellent
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="inventory-footer">
                                                    <h2>
                                                        Pris:{' '}
                                                        {Number(
                                                            cars.price
                                                        ).toLocaleString(
                                                            'sv-SE'
                                                        )}{' '}
                                                        kr
                                                    </h2>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Inventory
