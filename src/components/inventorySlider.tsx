import axios from 'axios'
import '../css/inventorySlider.css'
import { apiBaseUrl } from '../api/apiUrl'
import { apiEndpoints } from '../api/endpoints'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { routePaths } from '../utils/routePaths'

const InventorySlider = (): JSX.Element => {
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
            {!error && (
                <>
                    <h1 className="slider-header">Nyinkommna bilar</h1>
                    <div className="slider-wrapper">
                        <div className="slider-container">
                            {initialData.map((data) => (
                                <>
                                    <Link
                                        to={`${routePaths.inventory}/${data.id}`}
                                    >
                                        <div className="slides">
                                            <img
                                                src={data.images?.[0]?.fileName}
                                                alt={'preview'}
                                            />
                                            <h4>{data.header}</h4>
                                            <div className="inventory-facts-container">
                                                <div className="inventory-description">
                                                    <span>
                                                        {data.modelYear}
                                                    </span>
                                                </div>
                                                <div className="inventory-description">
                                                    <span>
                                                        {data.milage} mil
                                                    </span>
                                                </div>
                                                <div className="inventory-description">
                                                    <span>{data.gearBox}</span>
                                                </div>
                                                <div className="inventory-description">
                                                    <span>
                                                        {data.propellent}
                                                    </span>
                                                </div>
                                            </div>
                                            <h4>
                                                Pris:{' '}
                                                {Number(
                                                    data.price
                                                ).toLocaleString('sv-SE')}{' '}
                                                kr
                                            </h4>
                                        </div>
                                    </Link>
                                </>
                            ))}
                        </div>
                        <div
                            className="slider-container"
                            style={{ marginLeft: '1rem' }}
                        >
                            {initialData.map((data) => (
                                <>
                                    <Link
                                        to={`${routePaths.inventory}/${data.id}`}
                                    >
                                        <div className="slides">
                                            <img
                                                src={data.images?.[0]?.fileName}
                                                alt={'preview'}
                                            />
                                            <h4>{data.header}</h4>
                                            <div className="inventory-facts-container">
                                                <div className="inventory-description">
                                                    <span>
                                                        {data.modelYear}
                                                    </span>
                                                </div>
                                                <div className="inventory-description">
                                                    <span>
                                                        {data.milage} mil
                                                    </span>
                                                </div>
                                                <div className="inventory-description">
                                                    <span>{data.gearBox}</span>
                                                </div>
                                                <div className="inventory-description">
                                                    <span>
                                                        {data.propellent}
                                                    </span>
                                                </div>
                                            </div>
                                            <h4>
                                                Pris:{' '}
                                                {Number(
                                                    data.price
                                                ).toLocaleString('sv-SE')}{' '}
                                                kr
                                            </h4>
                                        </div>
                                    </Link>
                                </>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default InventorySlider
