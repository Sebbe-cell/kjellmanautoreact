import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/footer.css'

const Footer = (): JSX.Element => {
    return (
        <>
            <div className="footer">
                <div className="footer-content">
                    <div>
                        <h2>Kjellman Auto &copy;</h2>
                    </div>
                    <div>
                        <p>Teknikervägen 1, 149 45 Nynäshamn</p>
                        <p>Tel: +46 (0)8-400 687 86</p>
                        <a
                            href="https://www.instagram.com/kjellmanauto/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
