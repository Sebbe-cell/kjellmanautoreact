import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { apiBaseUrl } from '../api/apiUrl'
import { apiEndpoints } from '../api/endpoints'
import { routePaths } from '../utils/routePaths'
import { IVehicleData } from '../utils/interfaces'
import axios from 'axios'
import Hero from '../components/hero'
import logo from '../assets/uppdragstor.jpg'
import Loader from '../components/loader'
import FormInput from '../components/formInput'
import '../css/inventory.css'

interface IBulletPoints {
    title: string
}

const Inventory = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [searchInput, setSearchInput] = useState<string>('')
    const [vehicleData, setVehicleData] = useState<IVehicleData[]>([
        {
            monthlyPrice: 0,
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

    useEffect(() => {
        setLoading(true)
        axios
            // .get(apiBaseUrl + apiEndpoints.inventory)
            .get(apiBaseUrl + apiEndpoints.inventory)
            .then((response) => {
                setError(false)
                setVehicleData(response.data.vehicles.vehicle)
                setVehicleData(
                    response.data.vehicles.vehicle.map((car: IVehicleData) => ({
                        ...car,
                        monthlyPrice: calculateMonthlyPrice(
                            car.price[0].$.value
                        ),
                    }))
                )
            })
            .finally(() => {
                setLoading(false)
            })
            .catch(() => {
                setError(true)
            })
    }, [])

    const filteredCars = vehicleData.filter((car: IVehicleData) => {
        const searchLower = searchInput.toLowerCase()
        return (
            car.headline[0].toLowerCase().includes(searchLower) ||
            car.model[0].toLowerCase().includes(searchLower) ||
            car.gearbox[0].toLowerCase().includes(searchLower) ||
            car.primaryfuel[0].toLowerCase().includes(searchLower) ||
            car.price[0].$.value.toLowerCase().includes(searchLower)
        )
    })

    const bulletPoints: IBulletPoints[] = [
        { title: 'Varudeklarerade bilar' },
        { title: 'Hemleverans i hela Sverige' },
        { title: 'Möjlighet till 12-24 månaders garanti' },
        { title: 'Förmånlig finansiering via Santander Bank' },
    ]

    const calculateMonthlyPrice = (price: string) => {
        // Convert the price to a number (assuming it's in a valid format)
        const carPrice = parseFloat(price)

        // Deposit is 20% of the price
        const deposit = 0.2 * carPrice

        // Interest rate is 7% per year
        const annualInterestRate = 0.07

        // Total length of the loan in months
        const totalLength = 48

        // Calculate the monthly interest rate
        const monthlyInterestRate = annualInterestRate / 12

        // Calculate the monthly payment using the formula for a fixed-rate loan
        const monthlyPayment =
            ((carPrice - deposit) *
                (monthlyInterestRate *
                    Math.pow(1 + monthlyInterestRate, totalLength))) /
            (Math.pow(1 + monthlyInterestRate, totalLength) - 1)

        return monthlyPayment
    }

    return (
        <>
            <Hero imgSrc={logo} />
            <div className="inventory-main-container">
                <h1>Bilar till salu</h1>
                <ul className="inventory-list">
                    {bulletPoints.map((p: IBulletPoints, index: number) => (
                        <React.Fragment key={index}>
                            <li>
                                <div></div>
                                {p.title}
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
            </div>
            <div className="sell-form-container">
                <FormInput
                    label={'Sök bland våra bilar'}
                    id={'search'}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <div className="inventory-main-content">
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
                                            {filteredCars.map(
                                                (car: IVehicleData) => (
                                                    <div
                                                        className="inventory"
                                                        key={car.$.id}
                                                    >
                                                        <Link
                                                            to={`${routePaths.inventory}/${car.$.id}`}
                                                        >
                                                            <div className="inventory-container">
                                                                <img
                                                                    src={
                                                                        car
                                                                            .image?.[0]
                                                                            ?.main[0]
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
                                                                <h2>
                                                                    {car.monthlyPrice
                                                                        ?.toFixed(
                                                                            0
                                                                        )
                                                                        .replace(
                                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                                            '.'
                                                                        )}{' '}
                                                                    kr/månad
                                                                </h2>
                                                                <h3>
                                                                    {
                                                                        car
                                                                            .price[0]
                                                                            ._
                                                                    }
                                                                </h3>
                                                                <div className="divider"></div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            )}
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
