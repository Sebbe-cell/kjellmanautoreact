import { Link } from 'react-router-dom'

import { routePaths } from '../utils/routePaths'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../assets/Vagrat_logga_vit.png'
import '../css/footer.css'

const Footer = (): JSX.Element => {
    return (
        <>
            <div className='footer'>
                <div className='footer-content'>
                    <div className='footer-links'>
                        <p>Snabblänkar:</p>
                        <Link to={routePaths.inventory}>
                            <p>Köp</p>
                        </Link>
                        <Link to={routePaths.sell}>
                            <p>Sälj</p>
                        </Link>{' '}
                        <Link to={routePaths.contact}>
                            <p>Kontakt</p>
                        </Link>
                    </div>
                    <div className='footer-logo'>
                        <img src={Logo} alt='Logo' />
                    </div>
                    <div className='footer-info'>
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
