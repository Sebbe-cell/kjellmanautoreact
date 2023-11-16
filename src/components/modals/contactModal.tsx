import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-toastify/dist/ReactToastify.css';

interface IContactModalProps {
    headerText: string
    onClose: () => void
}

const ContactModal = (props: IContactModalProps): JSX.Element => {
    const { headerText, onClose } = props

    return (
        <div className='modal'>
            <div className='modal-container'>
                <div className='modal-header'>
                    <h1>{headerText}</h1>
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        size='xl'
                        onClick={onClose}
                    />
                </div>
                <div className='modal-body'>
                    <div style={{marginBottom: '-2rem'}}>
                        <p>Telefon: +46 (0)8-400 687 86</p>
                        <p>Adress: Teknikervägen 1, 149 45 Nynäshamn</p>
                        <p>E-post adress: info@kjellmanauto.se</p>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button
                        type='button'
                        className='modal-btn'
                        onClick={onClose}>
                        Stäng
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ContactModal
