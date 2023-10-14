import {
    faFacebook,
    faTwitter,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { routePaths } from '../utils/routePaths'
import '../css/footer.css'

const Footer = (): JSX.Element => {
    return (
        <>
            <div className="footer">
                <div className="footer-content">
                    <div>
                        <h2>Kjellman Auto &copy;</h2>
                        <Link to={routePaths.login}>
                            <h4>Logga in</h4>
                        </Link>
                    </div>
                    <div>
                        <p>Örkroken 21</p>
                        <p>Tel: 0739393939</p>
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
