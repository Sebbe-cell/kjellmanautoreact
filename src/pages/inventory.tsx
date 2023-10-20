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
            headline: [''],
            miles: [
                {
                    _: '',
                    $: {
                        value: '',
                    },
                },
            ],
            gearbox: [''],
            color: [''],
            description: [''],
            brand: [''],
            primaryfuel: [''],
            model: [''],
            modelyear: [''],
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
    const [searchInput, setSearchInput] = useState<string>('')

    useEffect(() => {
        setLoading(true)
        axios
            .get(apiBaseUrl + apiEndpoints.inventory)
            .then((response) => {
                setError(false)
                setInitialData(response.data.vehicles.vehicle)
            })
            .finally(() => {
                setLoading(false)
            })
            .catch(() => {
                setError(true)
            })
    }, [])

    const filteredCars = initialData.filter((car) => {
        const searchLower = searchInput.toLowerCase()
        return (
            car.headline[0].toLowerCase().includes(searchLower) ||
            car.model[0].toLowerCase().includes(searchLower) ||
            car.gearbox[0].toLowerCase().includes(searchLower) ||
            car.primaryfuel[0].toLowerCase().includes(searchLower) ||
            car.price[0]._.toLowerCase().includes(searchLower)
        )
    })

    return (
        <>
            <Hero imgSrc={logo} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        maxWidth: '80rem',
                        padding: '2rem 2rem 0 2rem',
                        textAlign: 'center',
                    }}
                >
                    <h1>Bilar till salu</h1>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <ul className="inventory-list">
                            <li
                                style={{
                                    color: 'white', // Set the text color to white
                                    position: 'relative',
                                    paddingLeft: '20px',
                                }}
                            >
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: '0',
                                        color: 'gold', // Set the bullet color to gold
                                    }}
                                >
                                    &bull; {/* Bullet character */}
                                </span>
                                Varudeklarerade bilar
                            </li>
                            <li
                                style={{
                                    color: 'white', // Set the text color to white
                                    position: 'relative',
                                    paddingLeft: '20px',
                                }}
                            >
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: '0',
                                        color: 'gold', // Set the bullet color to gold
                                    }}
                                >
                                    &bull; {/* Bullet character */}
                                </span>
                                Hemleverans i hela Sverige
                            </li>
                            <li
                                style={{
                                    color: 'white', // Set the text color to white
                                    position: 'relative',
                                    paddingLeft: '20px',
                                }}
                            >
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: '0',
                                        color: 'gold', // Set the bullet color to gold
                                    }}
                                >
                                    &bull; {/* Bullet character */}
                                </span>
                                Möjlighet till 12-24 Månaders Garanti
                            </li>
                            <li
                                style={{
                                    color: 'white', // Set the text color to white
                                    position: 'relative',
                                    paddingLeft: '20px',
                                }}
                            >
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: '0',
                                        color: 'gold', // Set the bullet color to gold
                                    }}
                                >
                                    &bull; {/* Bullet character */}
                                </span>
                                Förmånlig finansiering via Santander Bank
                            </li>
                        </ul>
                    </div>
                    <div className="inventory-input">
                        <FormInput
                            label={'Sök bland våra bilar'}
                            id={'search'}
                            optionalClass={true}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </div>
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
                                    {searchInput.length > 0 &&
                                    filteredCars.length === 0 ? (
                                        <h1>Din sökning gav ingen träff</h1>
                                    ) : (
                                        <>
                                            {filteredCars.map((car) => (
                                                <>
                                                    <div className="inventory">
                                                        <Link
                                                            to={`${routePaths.inventory}/${car.$.id}`}
                                                        >
                                                            <div className="inventory-container">
                                                                <img
                                                                    src={
                                                                        car
                                                                            .image?.[0]
                                                                            ?.large[0]
                                                                    }
                                                                    alt={
                                                                        'preview'
                                                                    }
                                                                    className="inventory-image"
                                                                />
                                                            </div>
                                                            <div className="inventory-content">
                                                                <p className="inventory-title">
                                                                    {
                                                                        car.headline
                                                                    }
                                                                </p>
                                                                <div className="inventory-facts-container">
                                                                    <div className="inventory-description">
                                                                        <span>
                                                                            {
                                                                                car.modelyear
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="inventory-description">
                                                                        <span>
                                                                            |
                                                                        </span>
                                                                    </div>
                                                                    <div className="inventory-description">
                                                                        <span>
                                                                            {
                                                                                car
                                                                                    .miles[0]
                                                                                    ._
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="inventory-description">
                                                                        <span>
                                                                            |
                                                                        </span>
                                                                    </div>
                                                                    <div className="inventory-description">
                                                                        <span>
                                                                            {
                                                                                car.gearbox
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="inventory-description">
                                                                        <span>
                                                                            |
                                                                        </span>
                                                                    </div>
                                                                    <div className="inventory-description">
                                                                        <span>
                                                                            {
                                                                                car.primaryfuel
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="inventory-footer">
                                                                <p
                                                                    style={{
                                                                        fontSize:
                                                                            '20px',
                                                                        fontWeight:
                                                                            'bold',
                                                                    }}
                                                                >
                                                                    {
                                                                        car
                                                                            .price[0]
                                                                            ._
                                                                    }
                                                                </p>
                                                                <div
                                                                    style={{
                                                                        background:
                                                                            'linear-gradient(90deg,#fff 0,#101010)',
                                                                        height: '0.1rem',
                                                                        marginTop:
                                                                            '1.5rem',
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </>
                                            ))}
                                        </>
                                    )}
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
