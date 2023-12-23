import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { routePaths } from '../utils/routePaths'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/nav-logo.png'
import '../css/navbar.css'

const Navbar = (): JSX.Element => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false)
    const [toggleMobileMenu, setToggleMobileMenu] = useState<boolean>(false)

    useEffect(() => {
        if (toggleMobileMenu) {
            document.body.classList.add('disable-background-scroll')
        } else {
            document.body.classList.remove('disable-background-scroll')
        }

        return () => {
            document.body.classList.remove('disable-background-scroll')
        }
    }, [toggleMobileMenu])

    let submenuTimeout: string | number | NodeJS.Timeout | null | undefined =
        null

    const openMobileMenu = (): void => {
        setToggleMobileMenu(!toggleMobileMenu)
        document.body.classList.add('disable-background-scroll')
    }

    const closeMobileMenu = (): void => {
        setToggleMobileMenu(false)
        document.body.classList.remove('disable-background-scroll')
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
                        <Link
                            className="navbar-internal-links"
                            to={routePaths.salesassignment}
                        >
                            Försäljningsuppdrag
                        </Link>
                        <Link
                            className="navbar-internal-links"
                            to={routePaths.contact}
                        >
                            Kontakt
                        </Link>
                        <div>
                            <p
                            style={{fontSize: '16px', display: 'inline-block', whiteSpace: 'nowrap'}}
                                onMouseEnter={openSubmenu}
                                onMouseLeave={closeSubmenu}
                                className="navbar-internal-links"
                            >
                                Upptäck mer
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
                                            to={routePaths.warrantys}
                                            className="navbar-internal-links"
                                        >
                                            Villkor & Garantier
                                        </Link>
                                        <Link
                                            to={routePaths.aboutus}
                                            className="navbar-internal-links"
                                        >
                                            Om oss
                                        </Link>
                                        <Link
                                            to={routePaths.policy}
                                            className="navbar-internal-links"
                                        >
                                            Integritetspolicy
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                        <a
                            href="https://www.instagram.com/kjellmanauto/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                    </div>
                    <div className="navbar-mobile">
                        <div
                            className="nav-mobile-logo-link"
                            onClick={closeMobileMenu}
                        >
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
                                    size="xl"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    onClick={openMobileMenu}
                                    size="xl"
                                />
                            )}
                        </div>
                    </div>
                </div>
                {toggleMobileMenu && (
                    <div className="mobile-dropdown">
                        <Link
                            to={routePaths.inventory}
                            className="navbar-internal-links"
                            onClick={closeMobileMenu}
                        >
                            Köp
                        </Link>
                        <Link
                            to={routePaths.sell}
                            className="navbar-internal-links"
                            onClick={closeMobileMenu}
                        >
                            Sälj
                        </Link>
                        <Link
                            to={routePaths.salesassignment}
                            className="navbar-internal-links"
                            onClick={closeMobileMenu}
                        >
                            Försäljningsuppdrag
                        </Link>
                        <Link
                            to={routePaths.warrantys}
                            className="navbar-internal-links"
                            onClick={closeMobileMenu}
                        >
                            Villkor & Garantier
                        </Link>
                        <Link
                            to={routePaths.contact}
                            className="navbar-internal-links"
                            onClick={closeMobileMenu}
                        >
                            Kontakt
                        </Link>
                        <Link
                            to={routePaths.aboutus}
                            className="navbar-internal-links"
                            onClick={closeMobileMenu}
                        >
                            Om oss
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default Navbar
