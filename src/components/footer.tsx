import { Link } from 'react-router-dom'

import { routePaths } from '../utils/routePaths'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../assets/Vagrat_logga_vit.png'
import '../css/footer.css'
import {
    faCartShopping,
    faHandHoldingDollar,
    faHandshake,
    faMapLocation
} from '@fortawesome/free-solid-svg-icons'

const Footer = (): JSX.Element => {
    return (
        <>
            <div className='footer'>
                <div className='footer-content'>
                    <div className='footer-links'>
                        <p>Kategorier</p>
                        <Link to={routePaths.inventory}>
                            <p>
                                <FontAwesomeIcon icon={faCartShopping} /> Köp
                            </p>
                        </Link>
                        <Link to={routePaths.sell}>
                            <p>
                                <FontAwesomeIcon icon={faHandHoldingDollar} />{' '}
                                Sälj
                            </p>
                        </Link>{' '}
                        <Link to={routePaths.salesassignment}>
                            <p>
                                <FontAwesomeIcon icon={faHandshake} />{' '}
                                Försäljningsuppdrag
                            </p>
                        </Link>{' '}
                        <Link to={routePaths.contact}>
                            <p>
                                <FontAwesomeIcon icon={faMapLocation} /> Kontakt
                            </p>
                        </Link>
                    </div>
                    <div className='footer-logo'>
                        <img src={Logo} alt='Logo' />
                    </div>
                    <div className='footer-info'>
                        <p
                            style={{
                                marginBottom: '2rem',
                                fontWeight: 'bold',
                                fontSize: '20px'
                            }}>
                            Kontakt
                        </p>
                        <p>Teknikervägen 1, 149 45 Nynäshamn</p>
                        <p>
                            <a href='tel:+46 (0)8-400 687 86'>
                                +46 (0)8-400 687 86
                            </a>
                        </p>
                        <a
                            style={{ paddingRight: '.4rem' }}
                            href='https://www.instagram.com/kjellmanauto/'
                            target='_blank'
                            rel='noreferrer'>
                            <FontAwesomeIcon icon={faInstagram} size='2x' />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
