import {
    faFacebook,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { routePaths } from '../utils/routePaths'
import logo from '../assets/nav-logo.png'
import '../css/navbar.css'
import { useState } from 'react'
import { faBars, faHamburger, faXmark } from '@fortawesome/free-solid-svg-icons'

const Navbar = (): JSX.Element => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false)
    const [toggleMobileMenu, setToggleMobileMenu] = useState<boolean>(false)

    let submenuTimeout: string | number | NodeJS.Timeout | null | undefined =
        null

    const openMobileMenu = (): void => {
        setToggleMobileMenu(!toggleMobileMenu)
    }

    const openSubmenu = (): void => {
        if (submenuTimeout) {
            clearTimeout(submenuTimeout)
        }
        setToggleMenu(true)
    }

    const closeSubmenu = (): void => {
        submenuTimeout = setTimeout(() => {
            setToggleMenu(false)
        }, 1000)
    }

    const cancelCloseSubmenu = (): void => {
        if (submenuTimeout) {
            clearTimeout(submenuTimeout)
        }
    }

    const resetSubmenu = () => {
        setToggleMenu(false)
        if (submenuTimeout) {
            clearTimeout(submenuTimeout)
        }
    }

    return (
        <>
            <div className="navbar-container">
                <div className="navbar-items">
                    <div className="navbar-links">
                        <Link className="nav-logo-link" to={routePaths.home}>
                            <img className="nav-logo" src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="navbar-icons">
                        <Link
                            className="navbar-internal-links"
                            to={routePaths.inventory}
                        >
                            Köp
                        </Link>
                        <Link
                            className="navbar-internal-links"
                            to={routePaths.sell}
                        >
                            Sälj
                        </Link>
                        <div>
                            <p
                                onMouseEnter={openSubmenu}
                                onMouseLeave={closeSubmenu}
                                className="navbar-internal-links"
                            >
                                Kontakt
                            </p>
                            {toggleMenu && (
                                <>
                                    <div
                                        className="submenu"
                                        onMouseEnter={cancelCloseSubmenu}
                                        onMouseLeave={closeSubmenu}
                                        onClick={resetSubmenu}
                                    >
                                        <Link
                                            to={routePaths.salesassignment}
                                            className="navbar-internal-links"
                                        >
                                            Försäljningsuppdrag
                                        </Link>
                                        <Link
                                            to={routePaths.warrantys}
                                            className="navbar-internal-links"
                                        >
                                            Villkor & Garantier
                                        </Link>
                                        <Link
                                            to={routePaths.contact}
                                            className="navbar-internal-links"
                                        >
                                            Kontakt
                                        </Link>
                                        <Link
                                            to={routePaths.aboutus}
                                            className="navbar-internal-links"
                                        >
                                            Om oss
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                        <FontAwesomeIcon icon={faFacebook} size="xl" />
                        <FontAwesomeIcon icon={faTwitter} size="xl" />
                        <FontAwesomeIcon icon={faInstagram} size="xl" />
                    </div>
                    {/* <div className="navbar-mobile">
                        <div className="nav-mobile-logo-link">
                            <Link to={routePaths.home}>
                                <img
                                    className="nav-mobile-logo"
                                    src={logo}
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div className="nav-mobile-links">
                            {!toggleMobileMenu ? (
                                    <FontAwesomeIcon
                                        icon={faBars}
                                        onClick={openMobileMenu}
                                    />
                            ) : (
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        onClick={openMobileMenu}
                                    />
                            )}
                        </div>
                        {toggleMobileMenu && (
                            <>
                                <p>Hello</p>
                            </>
                        )}
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Navbar
