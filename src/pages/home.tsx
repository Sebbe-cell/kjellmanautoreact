import { useEffect, useState } from 'react'
import { routePaths } from '../utils/routePaths'
import logo2 from '../assets/bluebmw.jpg'
import Modal from '../components/modal'
import logo3 from '../assets/beach.jpg'
import logo5 from '../assets/mapsmall.jpg'
import logo6 from '../assets/gearknob.jpg'
import MainHero from '../components/mainHero'
import ImageBanner from '../components/imageBanner'
import CardWithImage from '../components/cardWithImage'
import InventorySlider from '../components/inventorySlider'

const Home = (): JSX.Element => {
    const [openModal, setOpenModal] = useState<boolean>(false)

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
                    logo={logo3}
                    title={'Försäljningsuppdrag'}
                    url={routePaths.salesassignment}
                />
                <CardWithImage
                    logo={logo6}
                    title={'Sälj din bil här'}
                    url={routePaths.sell}
                />
                <CardWithImage
                    logo={logo5}
                    title={'Kontakt'}
                    url={routePaths.contact}
                />
            </div>

            <InventorySlider />

            {openModal && (
                <div style={{ zIndex: '1000' }}>
                    <Modal
                        isSellForm={true}
                        headerText="Fyll i bilens uppgifter"
                        submittedText="Tack!"
                        onClose={handleCloseModal}
                    />
                </div>
            )}
        </>
    )
}

export default Home
