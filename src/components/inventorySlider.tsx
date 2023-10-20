import axios from 'axios'
import '../css/inventorySlider.css'
import { apiBaseUrl } from '../api/apiUrl'
import { apiEndpoints } from '../api/endpoints'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { routePaths } from '../utils/routePaths'
import Loader from './loader'

const InventorySlider = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [initialData, setInitialData] = useState([
        {
            headline: [],
            miles: [
                {
                    _: '15 057 mil',
                    $: {
                        value: '15057',
                    },
                },
            ],
            gearbox: [],
            color: [],
            description: [],
            brand: [],
            primaryfuel: [],
            model: [],
            modelyear: [],
            price: [
                {
                    _: '',
                    $: {
                        value: '',
                    },
                },
            ],
            $: {
                id: '',
                locationid: '',
            },
            image: [
                {
                    $: {
                        index: '',
                        showh2h: '',
                    },
                    thumb: [''],
                    main: [''],
                    large: [''],
                },
            ],
        },
    ])

    useEffect(() => {
        setLoading(true)
        axios
            .get(apiBaseUrl + apiEndpoints.inventory)
            .then((response) => {
                setError(false)
                console.log(response.data.vehicles.vehicle)
                setInitialData(response.data.vehicles.vehicle)
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
            {loading ? (
                <Loader />
            ) : (
                <>
                    {!error && (
                        <>
                            <h1 className="slider-header">Nyinkommna bilar</h1>
                            <div className="slider-wrapper">
                                <div className="slider-container">
                                    {initialData.map((data) => (
                                        <>
                                            <Link
                                                to={`${routePaths.inventory}/${data.$.id}`}
                                            >
                                                <div className="slides">
                                                    <img
                                                        src={
                                                            data.image?.[0]
                                                                ?.main[0]
                                                        }
                                                        alt={'preview'}
                                                    />
                                                    <p style={{marginBottom: '0.2rem'}}>{data.headline}</p>
                                                    <div className="inventory-facts-container">
                                                        <div className="inventory-description">
                                                            <span>
                                                                {data.modelyear}
                                                            </span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>|</span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>
                                                                {
                                                                    data
                                                                        .miles[0]
                                                                        ._
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>|</span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>
                                                                {data.gearbox ??
                                                                    'n/a'}
                                                            </span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>|</span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>
                                                                {
                                                                    data.primaryfuel
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h4>{data.price[0]._}</h4>
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
                                                to={`${routePaths.inventory}/${data.$.id}`}
                                            >
                                                <div className="slides">
                                                    <img
                                                        src={
                                                            data.image?.[0]
                                                                ?.main[0]
                                                        }
                                                        alt={'preview'}
                                                    />
                                                    <h4>{data.headline}</h4>
                                                    <div className="inventory-facts-container">
                                                        <div className="inventory-description">
                                                            <span>
                                                                {data.modelyear}
                                                            </span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>|</span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>
                                                                {
                                                                    data
                                                                        .miles[0]
                                                                        ._
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>|</span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>
                                                                {data.gearbox ??
                                                                    'n/a'}
                                                            </span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>|</span>
                                                        </div>
                                                        <div className="inventory-description">
                                                            <span>
                                                                {
                                                                    data.primaryfuel
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h4>
                                                        Pris: {data.price[0]._}
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
            )}
        </>
    )
}

export default InventorySlider
