import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiBaseUrl } from '../api/apiUrl'
import { apiEndpoints } from '../api/endpoints'
import {
    faChevronLeft,
    faChevronRight,
    faFilePdf,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import jsPDF from 'jspdf'
import axios from 'axios'
import FormInput from '../components/formInput'
import { routePaths } from '../utils/routePaths'
import Loader from '../components/loader'

const CarDetails = (): JSX.Element => {
    const { carId } = useParams()

    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [months, setMonths] = useState(24)
    const [deposit, setDeposit] = useState('')
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
        setLoading(true)
        if (carId) {
            axios
                .get(apiBaseUrl + apiEndpoints.inventoryById + '/' + carId)
                .then((response) => {
                    setCarData(response.data)

                    const initialDeposit =
                        0.2 * parseFloat(response.data.price[0].$.value)
                    setDeposit(initialDeposit.toString())
                })
                .finally(() => {
                    setLoading(false)
                })
                .catch(() => {
                    setError(true)
                })
        }
    }, [carId])

    const generateCarPDF = (carData: any): void => {
        const doc = new jsPDF({
            orientation: 'portrait', // Portrait orientation for A4
            unit: 'mm', // Units in millimeters
            format: 'a4', // A4 page format
        })

        // Header - Add the title
        doc.setFontSize(18)
        const title = 'Kjellman Auto'

        // Calculate the width of the title
        const titleWidth = doc.getTextWidth(title)

        // Calculate the X-coordinate for centering the title
        const pageWidth = doc.internal.pageSize.width
        const xCoordinate = (pageWidth - titleWidth) / 2

        doc.text(title, xCoordinate, 25)

        // Body
        doc.setFontSize(12)
        doc.text(carData.headline, 10, 65)
        doc.text(`Märke: ${carData.brand}`, 10, 75)
        doc.text(`Modell: ${carData.model}`, 10, 85)
        doc.text(`Miltal: ${carData.miles[0]._}`, 10, 95)
        doc.text(`Pris: ${carData.price[0]._}`, 10, 105)

        // Footer
        doc.setFontSize(10)
        doc.text(
            'Teknikervägen 1, 149 45 Nynäshamn | Tel: +46 (0)8-400 687 86',
            105, // X-coordinate
            290, // Adjust the Y-coordinate to place the footer at the bottom
            { align: 'center' }
        )

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
        setDeposit(e.target.value)
    }

    if (!carData) {
        return <div>Bilen hittades inte</div>
    }

    const interestRate = 0.07
    const carPrice = parseFloat(carData.price[0].$.value)

    const calculateMonthlyPrice = (): string => {
        const convertedDeposit = deposit.replace(/\./g, '')
        console.log(convertedDeposit)
        if (months === 0) {
            return 'Välj antal månader'
        }

        // Calculate the loan amount after deducting the deposit
        const loanAmount = carPrice - Number(convertedDeposit)

        if (loanAmount <= 0) {
            return 'Depositionen är högre än eller lika med bilens pris.'
        }

        // Check if the deposit is less than 20% of the initial price
        const twentyPercentOfPrice = 0.2 * carPrice
        if (Number(convertedDeposit) < twentyPercentOfPrice) {
            return 'Handpenningen måste vara minst 20%'
        }

        const monthlyInterestRate = interestRate / 12
        const numerator =
            loanAmount *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, months)
        const denominator = Math.pow(1 + monthlyInterestRate, months) - 1
        const monthlyPayment = numerator / denominator

        return `${monthlyPayment
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} kr/månad`
    }

    const goToNext = (): void => {
        const isLastSlide = currentIndex === carData.image.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToPrevious = (): void => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide
            ? carData.image.length - 1
            : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const setNewIndex = (e: any): void => {
        setCurrentIndex(e)
    }

    const otherEquipmentArray = carData.otherequipment

    const flattenedEquipmentArray = otherEquipmentArray
        .join(',')
        .split(',')
        .map((item) => item.trim())

    return (
        <>
            {loading ? (
                <>
                    <Loader shouldHaveContainer={true} />
                </>
            ) : (
                <>
                    <div className="car-details-wrapper">
                        {error ? (
                            <h1>Bilen du letar efter kunde ej hittas</h1>
                        ) : (
                            <>
                                <div className="car-details-btn-container">
                                    <button className="standard-btn">
                                        <Link to={routePaths.inventory}>
                                            <FontAwesomeIcon
                                                icon={faChevronLeft}
                                                size="xl"
                                            />{' '}
                                            Tillbaka till butiken
                                        </Link>
                                    </button>
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="standard-btn"
                                    >
                                        <FontAwesomeIcon
                                            icon={faFilePdf}
                                            size="xl"
                                        />{' '}
                                        Ladda ner PDF
                                    </button>
                                </div>
                                <div className="car-details-container">
                                    <div className="car-details-img">
                                        <div className="car-details-icon-left">
                                            <FontAwesomeIcon
                                                icon={faChevronLeft}
                                                size="3x"
                                                onClick={goToNext}
                                            />
                                        </div>
                                        <img
                                            alt=""
                                            src={
                                                carData.image[currentIndex]
                                                    .large[0]
                                            }
                                        />
                                        <div className="car-details-icon-right">
                                            <FontAwesomeIcon
                                                icon={faChevronRight}
                                                onClick={goToPrevious}
                                                size="3x"
                                            />
                                        </div>
                                        <div className="car-details-slider-container">
                                            {carData.image.map((i, key) => (
                                                <div
                                                    onClick={() =>
                                                        setNewIndex(key)
                                                    }
                                                    key={key}
                                                    className="car-details-slider"
                                                >
                                                    <img
                                                        src={i.thumb[0]}
                                                        alt=""
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="car-details-info">
                                        <div>
                                            <h1>{carData.headline}</h1>
                                            <div className="divider"></div>
                                            <div className="inline-items">
                                                {flattenedEquipmentArray.map(
                                                    (item, index) => (
                                                        <>
                                                            <div className="inline-dot"></div>
                                                            <div
                                                                key={index}
                                                                className="inline-item"
                                                            >
                                                                {item}
                                                            </div>
                                                        </>
                                                    )
                                                )}
                                            </div>
                                            <div className="divider"></div>
                                            <p>{carData.description}</p>
                                            <div className="divider"></div>
                                            <p>
                                                Räkna ut din månadskostnad här:
                                            </p>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                }}
                                            >
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="72"
                                                    value={months}
                                                    onChange={(e) =>
                                                        handleChangeMonths(e)
                                                    }
                                                />
                                                <span>{months} månader</span>
                                            </div>

                                            <div
                                                style={{
                                                    width: '20rem',
                                                    margin: '1.5rem 0',
                                                }}
                                            >
                                                <FormInput
                                                    type="number"
                                                    label={
                                                        'Handpenning (minst 20%)'
                                                    }
                                                    id={'deposit'}
                                                    value={deposit}
                                                    onChange={(e) =>
                                                        handleChangeDeposit(e)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="divider"></div>
                                            <h1
                                                style={{
                                                    margin: '0',
                                                    paddingTop: '3px',
                                                    color: 'rgb(211, 174, 95)',
                                                }}
                                            >
                                                {carData.price[0]._}
                                            </h1>
                                            <p
                                                style={{
                                                    padding: '3px',
                                                    margin: '0',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                {calculateMonthlyPrice()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default CarDetails
