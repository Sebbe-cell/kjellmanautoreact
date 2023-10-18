import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Modal from './modal'

const ContactWidget = (): JSX.Element => {
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
        <div className="contact-widget">
            <div className="chat-btn" onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faMessage} size="xl" />
            </div>
            {openModal && <Modal onClose={handleCloseModal} headerText='Kontakta oss direkt' submittedText='Tack!' isContactForm={true} />}
        </div>
    )
}

export default ContactWidget
