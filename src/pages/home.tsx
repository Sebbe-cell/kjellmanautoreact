import { useEffect, useState } from 'react'

import { routePaths } from '../utils/routePaths'
import { apiBaseUrl } from '../api/apiUrl'
import { apiEndpoints } from '../api/endpoints'
import { IAlteredVehicleData } from '../utils/interfaces'
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

const Home = (): JSX.Element => {
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
                        value: '15057',
                    },
                },
            ],
            gearbox: [''],
            primaryfuel: [''],
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
            <MainHero handleOpenModal={handleOpenModal} />
            <ImageBanner
                header={'Bilar i lager'}
                description={'Begagnade bilar för omgående leverans'}
                btnText={'Lager'}
                url={routePaths.inventory}
                logo={logo2}
            />
            <div className="card-with-image-container">
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

            <div style={{ margin: '0 2rem 8rem 2rem' }}>
                <InventorySlider
                    data={initialData}
                    loading={loading}
                    error={error}
                />
            </div>

            {openModal && (
                <SellModal
                    headerText="Bilens uppgifter"
                    submittedText="Tack!"
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}

export default Home
