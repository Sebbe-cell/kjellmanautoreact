import { useEffect, useState } from 'react'

import { routePaths } from '../utils/routePaths'
import { apiBaseUrl } from '../api/apiUrl'
import { apiEndpoints } from '../api/endpoints'
import { IAlteredVehicleData } from '../utils/interfaces'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import logo2 from '../assets/bluebmw.jpg'
import logo3 from '../assets/uppdragsmall.jpg'
import logo4 from '../assets/koepliten.jpg'
import logo5 from '../assets/mapsmall.jpg'
import MainHero from '../components/mainHero'
import ImageBanner from '../components/imageBanner'
import CardWithImage from '../components/cardWithImage'
import InventorySlider from '../components/inventorySlider'
import SellModal from '../components/modals/sellModal'
import snowcar from '../assets/snowcar.jpg'
import headlight from '../assets/taillight.jpg'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import engine from '../assets/engine.mp4'
import dashboard from '../assets/dashboard.mp4'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SlickCarousel from '../components/slickCarousel'

const Home = (): JSX.Element => {
    const textControls = useAnimation()
    const imageControls = useAnimation()
    const leftImageControls = useAnimation()
    const rightTextControls = useAnimation()
    const isMobile = window.innerWidth <= 768

    const [textRef, textInView] = useInView({
        triggerOnce: false
    })

    const [imageRef, imageInView] = useInView({
        triggerOnce: false
    })

    const [leftImageRef, leftImageInView] = useInView({
        triggerOnce: false
    })

    const [rightTextRef, rightTextInView] = useInView({
        triggerOnce: false
    })

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [initialData, setInitialData] = useState<IAlteredVehicleData[]>([
        {
            headline: [''],
            miles: [
                {
                    _: '15 057 mil',
                    $: {
                        value: '15057'
                    }
                }
            ],
            gearbox: [''],
            primaryfuel: [''],
            modelyear: [''],
            price: [
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
        }
    ])

    useEffect(() => {
        setLoading(true)
        axios
            .get(apiBaseUrl + apiEndpoints.inventory, {
                withCredentials: true
            })
            .then((response) => {
                setError(false)
                setInitialData(response.data.vehicles.vehicle)
            })
            .finally(() => {
                setLoading(false)
            })
            .catch((error: any) => {
                let errorMessage = 'Network Error'
                if (error.response) {
                    errorMessage = `Server responded with status ${error.response.status}: ${error.response.data}`
                } else if (error.request) {
                    errorMessage = 'No response received from the server.'
                } else {
                    errorMessage = `Error during request setup: ${error.message}`
                }

                toast.error(
                    `Felkod: ${'Msg: ' + errorMessage + ' Kod: ' + error.code}`,
                    {
                        position: 'bottom-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    }
                )
                setError(true)
            })
    }, [])

    useEffect(() => {
        if (openModal) {
            document.body.classList.add('disable-background-scroll')
        } else {
            document.body.classList.remove('disable-background-scroll')
        }

        return () => {
            document.body.classList.remove('disable-background-scroll')
        }
    }, [openModal])

    useEffect(() => {
        if (textInView) {
            textControls.start({
                opacity: 1,
                x: 0,
                transition: {
                    type: 'spring',
                    duration: 1,
                    damping: 5,
                    stiffness: 20
                },
                zIndex: 0
            })
        } else {
            textControls.start({
                opacity: 0,
                x: -200,
                zIndex: -1
            })
        }
    }, [textControls, textInView])

    useEffect(() => {
        if (rightTextInView) {
            rightTextControls.start({
                opacity: 1,
                x: 0,
                transition: {
                    type: 'spring',
                    duration: 1,
                    damping: 5,
                    stiffness: 20
                },
                zIndex: 0
            })
        } else {
            rightTextControls.start({
                opacity: 0,
                x: 200,
                zIndex: -1
            })
        }
    }, [rightTextControls, rightTextInView])

    useEffect(() => {
        if (imageInView) {
            imageControls.start({
                opacity: 1,
                x: 0,
                transition: {
                    duration: 1
                }
            })
        } else {
            imageControls.start({
                opacity: 0,
                x: 200 // Change to positive value to make it move from right to left
            })
        }
    }, [imageControls, imageInView])

    useEffect(() => {
        if (leftImageInView) {
            leftImageControls.start({
                opacity: 1,
                x: 0,
                transition: {
                    duration: 1
                }
            })
        } else {
            leftImageControls.start({
                opacity: 0,
                x: -200 // Change to positive value to make it move from right to left
            })
        }
    }, [leftImageControls, leftImageInView])

    const handleOpenModal = (): void => {
        setOpenModal(true)
        document.body.classList.add('disable-background-scroll')
    }

    const handleCloseModal = (): void => {
        setOpenModal(false)
        document.body.classList.remove('disable-background-scroll')
    }

    return (
        <>
            <Helmet>
                <title>Kjellman Auto</title>
                <meta
                    name='Kjellman Auto'
                    content='Välkommen till Kjellman Auto'
                />
                <meta name='keywords' content='cars, kjellman, auto, bil' />
            </Helmet>
            <ToastContainer />
            <MainHero handleOpenModal={handleOpenModal} />

            <div className='divider-container-2'>
                <div className='divider' style={{ margin: '0' }}></div>
            </div>

            <ImageBanner
                header={''}
                description={
                    'För att se vårt urval av begagnade bilar klicka på knappen ovan.'
                }
                btnText={'Bilar i lager'}
                url={routePaths.inventory}
                logo={logo2}
            />

            <div className='divider-container-2'>
                <div className='divider' style={{ margin: '0' }}></div>
            </div>

            <div className='infographic-block-container'>
                <motion.div
                    ref={textRef}
                    animate={textControls}
                    initial={{ opacity: 0, x: -100, zIndex: 3 }}
                    className='infographic-block-text'>
                    <h1>
                        <span className='underline-1'>Gratis</span> hemleverans
                        i hela Stockholm
                    </h1>
                    <p>
                        Upptäck en ny nivå av bekvämlighet med vårt
                        specialerbjudande: gratis hemleverans av alla våra
                        bilar, var du än befinner dig i Stockholm!
                        <br /> Vi strävar efter att göra ditt bilköp så smidigt
                        och njutbart som möjligt. Kontakta oss via telefon eller
                        e-post för att få personlig assistans och information.
                        Alternativt, besök vårt lager direkt och upplev bilarna
                        på plats. <br />
                        Vi erbjuder flexibla köpalternativ för att passa dina
                        behov. Utforska vårt sortiment och låt oss leverera din
                        drömbil direkt till din dörr!
                    </p>
                </motion.div>
                <motion.div
                    ref={imageRef}
                    animate={imageControls}
                    initial={{ opacity: 0, x: 100, zIndex: -1 }}
                    className='infographic-block-img'>
                    <video
                        src={dashboard}
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture
                        disableRemotePlayback
                    />
                </motion.div>
            </div>

            <div className='divider-container'>
                <div className='divider' style={{ margin: '0' }}></div>
            </div>

            <div className='infographic-block-container'>
                <motion.div
                    ref={leftImageRef}
                    animate={leftImageControls}
                    initial={{ opacity: 0, x: 100, zIndex: -1 }}
                    className='infographic-block-img'>
                    <video
                        src={engine}
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture
                        disableRemotePlayback
                    />
                </motion.div>

                {isMobile ? (
                    <div className='infographic-block-text__right'>
                        <h1>
                            Smidig finansiering,{' '}
                            <span className='underline-2'>
                                hållbara garantier
                            </span>
                        </h1>
                        <p>
                            Vi erbjuder enkel och flexibel finansiering genom
                            leasing eller avbetalning i samarbete med pålitliga
                            partners som Santander Bank, Svea Ekonomi och My
                            Money.
                            <br />
                            De flesta bilar i vårt lager kan erbjudas med en
                            garantiperiod på 12-24 månader, vilket säkerställer
                            din trygghet och nöjdhet. Vi erbjuder också
                            exportmöjligheter, vilket gör att våra bilar är
                            tillgängliga för köp från andra EU-länder.
                            <br /> För frågor eller köpinspiration, ring oss på
                            08-400 687 86. Välkommen att besöka oss på
                            Teknikervägen 1, 149 45 Nynäshamn. Vi ser fram emot
                            att hjälpa dig hitta din nästa bil!
                        </p>
                    </div>
                ) : (
                    <motion.div
                        ref={rightTextRef}
                        animate={rightTextControls}
                        initial={{ opacity: 0, x: -100, zIndex: 3 }}
                        className='infographic-block-text__right'>
                        <h1>
                            Smidig finansiering,{' '}
                            <span className='underline-2'>
                                hållbara garantier
                            </span>
                        </h1>
                        <p>
                            Vi erbjuder enkel och flexibel finansiering genom
                            leasing eller avbetalning i samarbete med pålitliga
                            partners som Santander Bank, Svea Ekonomi och My
                            Money.
                            <br />
                            De flesta bilar i vårt lager kan erbjudas med en
                            garantiperiod på 12-24 månader, vilket säkerställer
                            din trygghet och nöjdhet. Vi erbjuder också
                            exportmöjligheter, vilket gör att våra bilar är
                            tillgängliga för köp från andra EU-länder.
                            <br /> För frågor eller köpinspiration, ring oss på
                            08-400 687 86. Välkommen att besöka oss på
                            Teknikervägen 1, 149 45 Nynäshamn. Vi ser fram emot
                            att hjälpa dig hitta din nästa bil!
                        </p>
                    </motion.div>
                )}
            </div>

            <div className='card-with-image-container'>
                <CardWithImage
                    logo={logo4}
                    title={'Försäljningsuppdrag'}
                    url={routePaths.salesassignment}
                />
                <CardWithImage
                    logo={logo3}
                    title={'Sälj din bil här'}
                    url={routePaths.sell}
                />
                <CardWithImage
                    logo={logo5}
                    title={'Kontakt'}
                    url={routePaths.contact}
                />
            </div>

            <div className='inventory-wrapper'>
                {/* <InventorySlider
                    data={initialData}
                    loading={loading}
                    error={error}
                /> */}
                <SlickCarousel data={initialData} />
            </div>

            {openModal && (
                <SellModal
                    headerText='Bilens uppgifter'
                    submittedText='Tack!'
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}

export default Home
