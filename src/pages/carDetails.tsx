import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { apiBaseUrl } from '../api/apiUrl'
import { apiEndpoints } from '../api/endpoints'
import { routePaths } from '../utils/routePaths'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBolt,
    faCalendar,
    faCartShopping,
    faChevronLeft,
    faChevronRight,
    faCircleInfo,
    faCloudDownload,
    faGasPump,
    faGears,
    faPaintBrush,
    faPhone,
    faRoad
} from '@fortawesome/free-solid-svg-icons'
import jsPDF from 'jspdf'
import axios from 'axios'
import Loader from '../components/loader'
import CalculateMonthlyModal from '../components/modals/calculateMonthlyModal'
import InterestModal from '../components/modals/interestModal'
import ContactModal from '../components/modals/contactModal'
import logo from '../assets/logga_svart_guld.png'
import '../css/carDetails.css'
import '../css/modal.css'
import useWindowDimensions from '../utils/useWindowDimensions'

const CarDetails = (): JSX.Element => {
    const { carId } = useParams()

    const navigate = useNavigate()
    const [openFullscreenImage, setOpenFullscreenImage] =
        useState<boolean>(false)
    const [modalValue, setModalValue] = useState<string>('')
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [deposit, setDeposit] = useState('')
    const [openCalculateMonthlyPrice, setOpenCalculateMonthlyPrice] =
        useState(false)
    const [carData, setCarData] = useState({
        headline: [''],
        miles: [
            {
                _: '',
                $: {
                    value: ''
                }
            }
        ],
        gearbox: [''],
        color: [''],
        description: [''],
        brand: [''],
        primaryfuel: [''],
        identification: [''],
        model: [''],
        modelyear: [''],
        bodytype: [''],
        colortext: [''],
        otherequipment: [''],
        price: [
            {
                _: '',
                $: {
                    value: ''
                }
            }
        ],
        power: [
            {
                _: '',
                $: {
                    value: ''
                }
            }
        ],
        $: {
            id: '',
            locationid: ''
        },
        image: [
            {
                $: {
                    index: '',
                    showh2h: ''
                },
                thumb: [''],
                main: [''],
                large: ['']
            }
        ]
    })

    const { width } = useWindowDimensions()

    useEffect(() => {
        setLoading(true)
        axios
            .get(apiBaseUrl + apiEndpoints.inventoryById + '/' + carId)
            .then((response: any) => {
                if (response.status === 200) {
                    setCarData(response.data)

                    const initialDeposit =
                        0.2 * parseFloat(response.data.price[0].$.value)
                    setDeposit(initialDeposit.toString())
                } else {
                    setError(true)
                }
            })
            .finally(() => {
                setLoading(false)
            })
            .catch((e: any) => {
                setError(true)
            })
    }, [carId])

    useEffect(() => {
        if (openModal || openCalculateMonthlyPrice) {
            document.body.classList.add('disable-background-scroll')
        } else {
            document.body.classList.remove('disable-background-scroll')
        }

        return () => {
            document.body.classList.remove('disable-background-scroll')
        }
    }, [openModal, openCalculateMonthlyPrice])

    const renderDescriptionWithLineBreaks = () => {
        const rawDescription = carData.description[0]
        const descriptionWithLineBreaks = rawDescription.replace(
            /\r\n/g,
            '<br/>'
        )

        return { __html: descriptionWithLineBreaks }
    }

    const handleOpenModal = (e: any): void => {
        setModalValue(e.target.value)
        setOpenModal(true)
        document.body.classList.add('disable-background-scroll')
    }

    const handleOpenCalculateMonthlyModal = (e: any): void => {
        setOpenCalculateMonthlyPrice(true)
        document.body.classList.add('disable-background-scroll')
    }

    const handleCloseModal = (): void => {
        setOpenModal(false)
        setOpenCalculateMonthlyPrice(false)
        document.body.classList.remove('disable-background-scroll')
    }

    const generateCarPDF = (carData: any): void => {
        const doc = new jsPDF({
            orientation: 'portrait', // Portrait orientation for A4
            unit: 'mm', // Units in millimeters
            format: 'a4' // A4 page format
        })

        const pageWidth = doc.internal.pageSize.width

        // Calculate the width and X-coordinate for centering the logo
        const logoWidth = 120
        const xLogoCoordinate = (pageWidth - logoWidth) / 2

        // Add the logo at the centered position
        doc.addImage(logo, 'PNG', xLogoCoordinate, 10, logoWidth, 15)
        doc.line(10, 35, 200, 35)

        const fontSize = 34

        doc.setFontSize(fontSize)

        // Calculate the width of the text
        const titleWidth =
            (doc.getStringUnitWidth(carData.headline[0]) * fontSize) /
            doc.internal.scaleFactor

        // Calculate the X-coordinate for centering the text
        const xTitleCoordinate = (pageWidth - titleWidth) / 2

        // Add the centered title
        doc.text(carData.headline[0], xTitleCoordinate, 55)
        doc.setFontSize(12)
        doc.text(`Modellår: ${carData.modelyear}`, 10, 75)
        doc.text(`Mäterställning: ${carData.miles[0]._}`, 10, 85)
        doc.text(`Växellåda: ${carData.gearbox[0]}`, 10, 95)
        doc.text(`Bränsle: ${carData.primaryfuel[0]}`, 10, 105)
        doc.text(`Hästkrafter: ${carData.power[0]._}`, 10, 115)
        // Split description into lines to fit within a specified width
        const maxWidth = 170 // Adjust the width as needed
        const descriptionLines = doc.splitTextToSize(
            carData.description[0],
            maxWidth
        )

        // Add each line of the description to the document
        descriptionLines.forEach((line: any, index: any) => {
            const yOffset = 125 + index * 4 // Adjust the vertical spacing as needed
            doc.text(line, 10, yOffset)
        })

        doc.setFontSize(68)
        // Calculate the width of the calculateMonthlyPrice() string
        const priceText = carData.price[0]._
        const priceWidth = doc.getTextWidth(priceText)

        // Calculate the X-coordinate for centering the monthly price
        const xCoordinatePrice = (pageWidth - priceWidth) / 2

        // Manually set the y-coordinate to 250 (adjust as needed)
        const yCoordinatePrice = 230

        doc.text(priceText, xCoordinatePrice, yCoordinatePrice)

        doc.setFontSize(54)
        // Calculate the width of the calculateMonthlyPrice() string
        const monthlyPriceText = calculateMonthlyPrice()
        const monthlyPriceWidth = doc.getTextWidth(monthlyPriceText)

        // Calculate the X-coordinate for centering the monthly price
        const xCoordinateMonthlyPrice = (pageWidth - monthlyPriceWidth) / 2

        // Manually set the y-coordinate to 250 (adjust as needed)
        const yCoordinateMonthlyPrice = 260

        doc.text(
            monthlyPriceText,
            xCoordinateMonthlyPrice,
            yCoordinateMonthlyPrice
        )

        // Footer
        doc.line(10, 280, 200, 280)
        doc.setFontSize(10)
        doc.text(
            'Teknikervägen 1, 149 45 Nynäshamn | Tel: +46 (0)8-400 687 86',
            105, // X-coordinate
            290, // Adjust the Y-coordinate to place the footer at the bottom
            { align: 'center' }
        )

        const fileName = `${carData.headline[0]}.pdf`
        doc.save(fileName)
    }

    const handleDownloadPDF = (): void => {
        generateCarPDF(carData)
    }

    const totalImageLength = carData.image.length
    const interestRate = 0.0795
    const carPrice = parseFloat(carData.price[0].$.value)
    const months = 84

    const calculateMonthlyPrice = (): string => {
        const convertedDeposit = deposit.replace(/\./g, '')
        const loanAmount = carPrice - Number(convertedDeposit)

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

    const handleBackBtn = (): void => {
        navigate(routePaths.inventory)
    }

    const handleToggleFullScreen = (): void => {
        setOpenFullscreenImage(!openFullscreenImage)
    }

    useEffect(() => {
        if (width < 768) {
            setOpenFullscreenImage(false)
        }
    }, [width])

    return (
        <>
            {loading ? (
                <>
                    <Loader shouldHaveContainer={true} />
                </>
            ) : (
                <>
                    <div className='car-details-wrapper'>
                        {error ? (
                            <h1>Bilen du letar efter kunde ej hittas</h1>
                        ) : (
                            <>
                                <div className='car-details-btn-container'>
                                    <button
                                        onClick={handleBackBtn}
                                        className='standard-btn'>
                                        <FontAwesomeIcon
                                            icon={faChevronLeft}
                                            size='xl'
                                        />{' '}
                                        Tillbaka till lagret
                                    </button>
                                    <button
                                        onClick={handleDownloadPDF}
                                        className='standard-btn'>
                                        <FontAwesomeIcon
                                            icon={faCloudDownload}
                                            size='xl'
                                        />{' '}
                                        Ladda ner PDF
                                    </button>
                                </div>
                                <div className='car-details-container'>
                                    <div className='car-details-img-container'>
                                        <div className='car-details-img'>
                                            <div className='car-details-icon-left'>
                                                <FontAwesomeIcon
                                                    icon={faChevronLeft}
                                                    size='3x'
                                                    onClick={goToPrevious}
                                                />
                                            </div>
                                            <img
                                                alt=''
                                                src={
                                                    carData.image[currentIndex]
                                                        .large[0]
                                                }
                                            />
                                            {width > 768 && (
                                                <div className='car-details-icon-top'>
                                                    <p
                                                        onClick={
                                                            handleToggleFullScreen
                                                        }>
                                                        Fullskärm
                                                    </p>
                                                </div>
                                            )}
                                            <div className='car-details-icon-bottom'>
                                                <p>
                                                    {`Bild ${
                                                        currentIndex + 1
                                                    } av ${totalImageLength}`}
                                                </p>
                                            </div>
                                            <div className='car-details-icon-right'>
                                                <FontAwesomeIcon
                                                    icon={faChevronRight}
                                                    onClick={goToNext}
                                                    size='3x'
                                                />
                                            </div>
                                        </div>
                                        <div className='car-details-slider-container'>
                                            {carData.image.map((i, key) => (
                                                <div
                                                    onClick={() =>
                                                        setNewIndex(key)
                                                    }
                                                    key={key}
                                                    className='car-details-slider'>
                                                    <img
                                                        src={i.thumb[0]}
                                                        alt=''
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='car-details-info'>
                                        <div>
                                            <h1>{carData.headline}</h1>
                                            <div className='divider'></div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    width: '100%',
                                                    gap: '1rem',
                                                    margin: '0',
                                                    flexWrap: 'wrap'
                                                }}>
                                                <p
                                                    style={{
                                                        margin: '0',
                                                        backgroundColor:
                                                            'transparent',
                                                        padding: '6px',
                                                        color: 'white',
                                                        borderRadius: '4px',
                                                        fontSize: '16px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        gap: '0.4rem'
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faCalendar}
                                                    />{' '}
                                                    {carData.modelyear}
                                                </p>
                                                <p
                                                    style={{
                                                        margin: '0',
                                                        backgroundColor:
                                                            'transparent',
                                                        padding: '6px',
                                                        color: 'white',
                                                        borderRadius: '4px',
                                                        fontSize: '16px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        gap: '0.4rem'
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faRoad}
                                                    />{' '}
                                                    {carData.miles[0]._}
                                                </p>
                                                <p
                                                    style={{
                                                        margin: '0',
                                                        backgroundColor:
                                                            'transparent',
                                                        padding: '6px',
                                                        color: 'white',
                                                        borderRadius: '4px',
                                                        fontSize: '16px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        gap: '0.4rem'
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faGears}
                                                    />{' '}
                                                    {carData.gearbox}
                                                </p>
                                                <p
                                                    style={{
                                                        margin: '0',
                                                        backgroundColor:
                                                            'transparent',
                                                        padding: '6px',
                                                        color: 'white',
                                                        borderRadius: '4px',
                                                        fontSize: '16px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        gap: '0.4rem'
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faGasPump}
                                                    />{' '}
                                                    {carData.primaryfuel}
                                                </p>
                                                <p
                                                    style={{
                                                        margin: '0',
                                                        backgroundColor:
                                                            'transparent',
                                                        padding: '6px',
                                                        color: 'white',
                                                        borderRadius: '4px',
                                                        fontSize: '16px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        gap: '0.4rem'
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faBolt}
                                                    />{' '}
                                                    {carData.power[0]._}
                                                </p>
                                                <p
                                                    style={{
                                                        margin: '0',
                                                        backgroundColor:
                                                            'transparent',
                                                        padding: '6px',
                                                        color: 'white',
                                                        borderRadius: '4px',
                                                        fontSize: '16px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        gap: '0.4rem'
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faPaintBrush}
                                                    />{' '}
                                                    {carData.colortext}
                                                </p>
                                            </div>
                                            <div className='divider'></div>
                                            {/* <p>{carData.description}</p> */}
                                            <p
                                                dangerouslySetInnerHTML={renderDescriptionWithLineBreaks()}
                                            />
                                            <p>
                                                Registreringsnummer:{' '}
                                                {carData.identification}
                                            </p>
                                            <div className='divider'></div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                <div>
                                                    <p
                                                        style={{
                                                            padding: '3px',
                                                            margin: '0',
                                                            fontSize: '26px'
                                                        }}>
                                                        {calculateMonthlyPrice()}
                                                        <span className='info-btn'>
                                                            <FontAwesomeIcon
                                                                onClick={
                                                                    handleOpenCalculateMonthlyModal
                                                                }
                                                                icon={
                                                                    faCircleInfo
                                                                }
                                                                size='xs'
                                                            />
                                                        </span>
                                                    </p>
                                                    <h1
                                                        style={{
                                                            margin: '0',
                                                            paddingTop: '3px',
                                                            color: 'rgb(211, 174, 95)'
                                                        }}>
                                                        {carData.price[0]._}
                                                    </h1>
                                                </div>
                                                <div className='car-details-info-container'>
                                                    <button
                                                        value='interest'
                                                        onClick={(e) =>
                                                            handleOpenModal(e)
                                                        }
                                                        className='standard-btn'
                                                        style={{
                                                            fontSize: '14px'
                                                        }}>
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faCartShopping
                                                            }
                                                            size='xl'
                                                        />{' '}
                                                        Intresseanmälan
                                                    </button>
                                                    <button
                                                        value='contact'
                                                        onClick={(e) =>
                                                            handleOpenModal(e)
                                                        }
                                                        className='standard-btn'
                                                        style={{
                                                            fontSize: '14px'
                                                        }}>
                                                        <FontAwesomeIcon
                                                            icon={faPhone}
                                                            size='xl'
                                                        />{' '}
                                                        Kontakta oss
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='car-details-info-container__mobile'>
                                                <button
                                                    value='interest'
                                                    onClick={(e) =>
                                                        handleOpenModal(e)
                                                    }
                                                    className='standard-btn'
                                                    style={{
                                                        fontSize: '14px'
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faCartShopping}
                                                        size='xl'
                                                    />{' '}
                                                    Intresseanmälan
                                                </button>
                                                <button
                                                    value='contact'
                                                    onClick={(e) =>
                                                        handleOpenModal(e)
                                                    }
                                                    className='standard-btn'
                                                    style={{
                                                        fontSize: '14px'
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faPhone}
                                                        size='xl'
                                                    />{' '}
                                                    Kontakta oss
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}

            {openCalculateMonthlyPrice && (
                <CalculateMonthlyModal
                    onClose={handleCloseModal}
                    carData={carData}
                />
            )}

            {openModal && (
                <>
                    {modalValue === 'interest' ? (
                        <InterestModal
                            headerText={carData.headline[0]}
                            onClose={handleCloseModal}
                        />
                    ) : (
                        <ContactModal
                            headerText={'Kontakta oss direkt'}
                            onClose={handleCloseModal}
                        />
                    )}
                </>
            )}

            {openFullscreenImage && (
                <div className='fullscreen-container'>
                    <div className='fullscreen-wrapper'>
                        <div style={{ paddingRight: '2rem' }}>
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                onClick={goToPrevious}
                                size='3x'
                            />
                        </div>
                        <div className='fullscreen-img-container'>
                            <img
                                alt=''
                                src={carData.image[currentIndex].large[0]}
                            />
                            <div className='test1'>
                                <p onClick={handleToggleFullScreen}>Stäng</p>
                            </div>
                        </div>
                        <div style={{ paddingLeft: '2rem' }}>
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                onClick={goToNext}
                                size='3x'
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CarDetails
