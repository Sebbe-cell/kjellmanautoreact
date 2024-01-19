import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-toastify/dist/ReactToastify.css'

interface IContactModalProps {
    headerText: string
    onClose: () => void
}

const ContactModal = (props: IContactModalProps): JSX.Element => {
    const { headerText, onClose } = props

    const warrantyCard = [
        {
            title: 'GoSafe Plus 12-24 Månader',
            desc: 'Ingen självrisk',
            price_12_months: '12 Mån: 4995 kr',
            price_24_months: '24 Mån: 7295 kr'
        },
        {
            title: 'GoSafe Premium 12-24 Månader',
            desc: 'Ingen självrisk',
            price_12_months: '12 Mån: 5795 kr',
            price_24_months: '24 Mån: 7995 kr'
        }
    ]

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
                <p>
                    En värdeskapande garanti med omfattande täckning, även det
                    lilla extra. GoSafe är en av marknadens mest heltäckande och
                    flexibla garantier för nästan alla begagnade bilar yngre än
                    12 år. Även för dig med Hybridbil.
                </p>
                <div className='modal-body'>
                    <div className='warranty_card_container'>
                        {warrantyCard.map((cardProps, index: number) => (
                            <div key={index} className='warranty_card'>
                                <h3>{cardProps.title}</h3>
                                <div
                                    className='divider'
                                    style={{ margin: 0 }}></div>
                                <p>{cardProps.desc}</p>
                                <div
                                    className='divider'
                                    style={{ margin: 0 }}></div>
                                <div className='warranty_card_price'>
                                    <p>{cardProps.price_12_months}</p>
                                    <p>{cardProps.price_24_months}</p>
                                </div>
                                <a
                                    href='https://fragus.com/media/ctidfhwp/gosafe-plus-se.pdf'
                                    target='_blank'
                                    rel='noreferrer'>
                                    Läs mer
                                </a>
                            </div>
                        ))}
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
