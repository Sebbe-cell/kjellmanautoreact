import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiBaseUrl } from '../api/apiUrl'
import { apiEndpoints } from '../api/endpoints'
import {
    faArrowLeft,
    faArrowRight,
    faCalendarDay,
    faCar,
    faCarBattery,
    faGasPump,
    faGear,
    faPaintRoller,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import jsPDF from 'jspdf'
import axios from 'axios'

const CarDetails = (): JSX.Element => {
    const { carId } = useParams()

    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [months, setMonths] = useState(24)
    const [deposit, setDeposit] = useState(0)
    const [carData, setCarData] = useState({
        headline: [],
        miles: [
            {
                _: '',
                $: {
                    value: '',
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
        bodytype: [],
        otherequipment: [],
        price: [
            {
                _: '',
                $: {
                    value: '',
                },
            },
        ],
        power: [
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
    })

    useEffect(() => {
        if (carId) {
            axios
                .get(apiBaseUrl + apiEndpoints.inventoryById + '/' + carId)
                .then((response) => {
                    setCarData(response.data)

                    const initialDeposit =
                        0.2 * parseFloat(response.data.price[0].$.value)
                    setDeposit(initialDeposit)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [carId])

    const generateCarPDF = (carData: any): void => {
        const doc = new jsPDF()
        doc.text(carData.headline, 10, 10)
        doc.text(carData.brand, 10, 20)
        doc.text(carData.model, 30, 20)

        // Convert the PDF to a data URL.
        const pdfDataUri = doc.output('datauristring')

        // Open the PDF in a new tab.
        const newTab = window.open()
        if (newTab) {
            newTab.document.write(
                '<iframe width="100%" height="100%" src="' +
                    pdfDataUri +
                    '"></iframe'
            )
        } else {
            // Handle the case where window.open failed (e.g., due to a popup blocker).
            alert(
                'Failed to open a new tab. Please check your browser settings.'
            )
        }
    }

    const handleDownloadPDF = (): void => {
        generateCarPDF(carData)
    }

    const handleChangeMonths = (e: any): void => {
        setMonths(Number(e.target.value))
    }

    const handleChangeDeposit = (e: any): void => {
        setDeposit(Number(e.target.value))
    }

    if (!carData) {
        return <div>Bilen hittades inte</div>
    }

    const interestRate = 0.0495
    const carPrice = parseFloat(carData.price[0].$.value)

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

        return `Månadskostnad: ${monthlyPayment
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} kr`
    }

    const containerStyles = {
        width: '500px',
        height: '280px',
        margin: '0 auto',
    }

    const slideStyles = {
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${carData.image[currentIndex].large})`,
    }

    const goToNext = (): void => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide
            ? carData.image.length - 1
            : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const goToPrevious = () => {
        const isLastSlide = currentIndex === carData.image.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const setNewIndex = (e: any) => {
        setCurrentIndex(e)
    }

    const equipmentArray =
        (carData.otherequipment[0] as string)
            ?.split(',')
            .map((item) => item.trim()) || []

    return (
        <>
            <div
                style={{
                    marginTop: '10rem',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '80rem',
                        border: '2px solid white',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div style={containerStyles}>
                        <div style={{ height: '100%', position: 'relative' }}>
                            <div
                                onClick={goToPrevious}
                                style={{
                                    cursor: 'pointer',
                                    top: '50%',
                                    transform: 'translate(0, -50%)',
                                    left: '32px',
                                    position: 'absolute',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    size="2xl"
                                />
                            </div>
                            <div style={slideStyles}></div>
                            <div
                                onClick={goToNext}
                                style={{
                                    cursor: 'pointer',
                                    top: '50%',
                                    transform: 'translate(0, -50%)',
                                    right: '32px',
                                    position: 'absolute',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    size="2xl"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        {carData.image.map((i, key) => (
                            <div
                                onClick={() => setNewIndex(key)}
                                key={key}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    margin: '0 auto',
                                    cursor: 'pointer',
                                }}
                            >
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectPosition: 'center',
                                        objectFit: 'cover',
                                    }}
                                    src={i.large[0]}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="ka-car-details-container">
                <div className="ka-car-details">
                    <div>
                        <h1>{carData.headline}</h1>
                        <p>{carData.otherequipment}</p>
                        <h4>Miltal: {carData.miles[0]._}</h4>
                        <p>{carData.description}</p>
                        <h2>Pris: {carData.price[0]._}</h2>
                        <button
                            style={{ marginBottom: '2rem' }}
                            className="btn"
                            onClick={handleDownloadPDF}
                        >
                            Skriv ut PDF
                        </button>
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
                    <img src={carData.image[0]?.large[0]} alt="" />
                </div>
            </div>

            <div className="ka-car-info-container">
                <div className="ka-car-info">
                    <div className="ka-car-info-header">
                        <h2>Utrustning</h2>
                    </div>
                    <div className="ka-car-info-body">
                        {equipmentArray.map((equipment, index) => (
                            <>
                                {equipment.length > 0 && (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '2px',
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faGear}
                                            size="lg"
                                        />
                                        <div style={{ margin: '10px' }}>
                                            <p style={{ margin: '0px' }}>
                                                {equipment}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="ka-car-info-container"
                style={{ paddingBottom: '4rem' }}
            >
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
                                <p style={{ margin: '0px' }}>
                                    {carData.primaryfuel}
                                </p>
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
                                <p style={{ margin: '0px' }}>
                                    {carData.gearbox}
                                </p>
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
                                <p style={{ margin: '0px' }}>
                                    {carData.modelyear}
                                </p>
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
                                <p style={{ margin: '0px' }}>
                                    {carData.color.length > 1
                                        ? carData.color
                                        : 'n/a'}
                                </p>
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
                                <p style={{ margin: '0px' }}>
                                    {carData.power[0]._}
                                </p>
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
                                <p style={{ margin: '0px' }}>
                                    {carData.bodytype}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarDetails
