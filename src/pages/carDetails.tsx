import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiBaseUrl } from '../api/apiUrl'
import { apiEndpoints } from '../api/endpoints'
import {
    faCalendarDay,
    faCar,
    faCarBattery,
    faGasPump,
    faGear,
    faPaintRoller,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Slider from '../components/slider'

const CarDetails = (): JSX.Element => {
    const { carId } = useParams()

    const [months, setMonths] = useState(24)
    const [deposit, setDeposit] = useState(0) // New state for deposit
    const [carData, setCarData] = useState({
        header: '',
        model: '',
        make: '',
        milage: '',
        plateNumber: '',
        id: 0,
        price: '',
        color: '',
        description: '',
        equipment: [{ name: '', id: 0 }],
        images: [{ fileName: '' }],
    })

    useEffect(() => {
        if (carId) {
            axios
                .get(apiBaseUrl + apiEndpoints.inventory + '/' + carId)
                .then((response) => {
                    setCarData(response.data.data)

                    const initialDeposit =
                        0.2 * parseFloat(response.data.data.price)
                    setDeposit(initialDeposit)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [carId])

    const handleChangeMonths = (e: any): void => {
        setMonths(Number(e.target.value))
    }

    const handleChangeDeposit = (e: any): void => {
        setDeposit(Number(e.target.value))
    }

    if (!carData.model) {
        return <div>Bilen hittades inte</div>
    }

    const interestRate = 0.0495
    const carPrice = parseFloat(carData.price)

    const calculateMonthlyPrice = (): string => {
        if (months === 0) {
            return 'Välj antal månader'
        }

        // Calculate the loan amount after deducting the deposit
        const loanAmount = carPrice - deposit

        if (loanAmount <= 0) {
            return 'Depositionen är högre än eller lika med bilens pris.'
        }

        // Check if the deposit is less than 20% of the initial price
        const twentyPercentOfPrice = 0.2 * carPrice
        if (deposit < twentyPercentOfPrice) {
            return 'Handpenningen måste vara minst 20%'
        }

        const monthlyInterestRate = interestRate / 12
        const numerator =
            loanAmount *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, months)
        const denominator = Math.pow(1 + monthlyInterestRate, months) - 1
        const monthlyPayment = numerator / denominator

        return `Månadskostnad: ${monthlyPayment.toFixed(2)} SEK`
    }

    return (
        <>
            <div className="ka-car-details-container">
                <div className="ka-car-details">
                    <div>
                        <h1>{carData.header}</h1>
                        <h1>{carData.make}</h1>
                        <h2>{carData.model}</h2>
                        <h4>Miltal: {carData.milage} km </h4>
                        <h4>Färg: {carData.color}</h4>
                        <p>{carData.description}</p>
                        <h2>Pris: {carData.price} SEK</h2>
                    </div>
                    <div className="calculate-price">
                        <h3>Räkna ut din månadskostnad här:</h3>
                        <input
                            type="range"
                            min="0"
                            max="72"
                            step="1"
                            value={months}
                            onChange={(e) => handleChangeMonths(e)}
                        />
                        <p>{months} månader</p>
                        <label htmlFor="deposit">
                            Handpenning (minst 20%):{' '}
                        </label>
                        <input
                            type="number"
                            id="deposit"
                            value={deposit}
                            onChange={(e) => handleChangeDeposit(e)}
                        />
                        <p>{calculateMonthlyPrice()}</p>
                    </div>
                </div>
                <div className="ka-car-img">
                    <img src={carData.images[0]?.fileName} alt='' />
                </div>
            </div>
            <div className="ka-car-info-container">
                <div className="ka-car-info">
                    <div className="ka-car-info-header">
                        <h2>Fakta</h2>
                    </div>
                    <div className="ka-car-info-body">
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                            }}
                        >
                            <FontAwesomeIcon icon={faGasPump} size="lg" />
                            <div style={{ margin: '10px' }}>
                                <h4 style={{ margin: '0px' }}>Bränsle</h4>
                                <p style={{ margin: '0px' }}>Diesel</p>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                            }}
                        >
                            <FontAwesomeIcon icon={faGear} size="lg" />
                            <div style={{ margin: '10px' }}>
                                <h4 style={{ margin: '0px' }}>Växellåda</h4>
                                <p style={{ margin: '0px' }}>Automat</p>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                            }}
                        >
                            <FontAwesomeIcon icon={faCalendarDay} size="lg" />
                            <div style={{ margin: '10px' }}>
                                <h4 style={{ margin: '0px' }}>Modellår</h4>
                                <p style={{ margin: '0px' }}>2021</p>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                            }}
                        >
                            <FontAwesomeIcon icon={faPaintRoller} size="lg" />
                            <div style={{ margin: '10px' }}>
                                <h4 style={{ margin: '0px' }}>Färg</h4>
                                <p style={{ margin: '0px' }}>Svart</p>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                            }}
                        >
                            <FontAwesomeIcon icon={faCarBattery} size="lg" />
                            <div style={{ margin: '10px' }}>
                                <h4 style={{ margin: '0px' }}>Hästkrafter</h4>
                                <p style={{ margin: '0px' }}>250hk</p>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                            }}
                        >
                            <FontAwesomeIcon icon={faCar} size="lg" />
                            <div style={{ margin: '10px' }}>
                                <h4 style={{ margin: '0px' }}>Biltyp</h4>
                                <p style={{ margin: '0px' }}>Sedan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="ka-car-info-container"
                style={{ paddingBottom: '4rem' }}
            >
                <div className="ka-car-info">
                    <div className="ka-car-info-header">
                        <h2>Utrustning</h2>
                    </div>
                    <div className="ka-car-info-body">
                        {carData.equipment.map((equipments) => (
                            <div
                                key={equipments.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '2px',
                                }}
                            >
                                <FontAwesomeIcon icon={faGear} size="lg" />
                                <div style={{ margin: '10px' }}>
                                    <p style={{ margin: '0px' }}>
                                        {equipments.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarDetails
