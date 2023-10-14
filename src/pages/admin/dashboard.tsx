import '../../css/sidemenu.css'
import { MouseEvent, useEffect, useState } from 'react'
import AddInventory from './addInventory'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowAltCircleLeft,
    faCashRegister,
    faChevronRight,
    faRightFromBracket,
    faUpload,
    faUser,
    faUsers,
    faWarehouse,
} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { routePaths } from '../../utils/routePaths'
import CustomModal from '../../components/customModal'
import Main from './main'
import Inventory from './inventory'
import Economy from './economy'
import Personal from './personal'
import UserProfile from './userProfile'

enum ComponentEnums {
    main = 'main',
    addInventory = 'addInventory',
    economy = 'economy',
    personal = 'personal',
    userProfile = 'userProfile',
    inventory = 'inventory',
}

function getCurrentDimension() {
    return {
        width: window.innerWidth,
    }
}

const DashBoard = (): JSX.Element => {
    const navigate = useNavigate()
    const [component, setComponent] = useState<ComponentEnums>(
        ComponentEnums.main
    )
    const [toggleSideMenu, setToggleSideMenu] = useState<boolean>(true)
    const [logoutModal, setLogoutModal] = useState<boolean>(false)
    const [screenSize, setScreenSize] = useState(getCurrentDimension())

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension)

        return () => {
            window.removeEventListener('resize', updateDimension)
        }
    }, [screenSize])

    useEffect(() => {
        if (screenSize.width < 768 && toggleSideMenu) {
            document.body.style.overflow = 'hidden' // Disable scrolling
        } else {
            document.body.style.overflow = 'auto' // Enable scrolling
        }
    }, [toggleSideMenu, screenSize])

    const openComponent = (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ): void => {
        const componentValue = e.currentTarget.value as ComponentEnums // Use e.currentTarget.value
        setComponent(componentValue)

        if (screenSize.width < 768 && toggleSideMenu) {
            setToggleSideMenu(!toggleSideMenu)
        }
    }

    const toggleMenu = (): void => {
        setToggleSideMenu(!toggleSideMenu)
    }

    const onLogout = (): void => {
        setLogoutModal(true)
        document.body.classList.add('disable-background-scroll')
    }

    const onCloseModal = (): void => {
        setLogoutModal(false)
        document.body.classList.remove('disable-background-scroll')
    }

    const logOut = (): void => {
        setLogoutModal(false)
        localStorage.clear()
        navigate(routePaths.login)
    }

    return (
        <>
            <div>
                {toggleSideMenu && (
                    <div className="sidemenu">
                        <div className="sidemenu-container">
                            <div className="sidemenu-header">
                                <FontAwesomeIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={toggleMenu}
                                    icon={faArrowAltCircleLeft}
                                    size="lg"
                                    color="white"
                                />
                                <button
                                    value={ComponentEnums.main}
                                    onClick={(e) => openComponent(e)}
                                    style={{ color: 'white' }}
                                >
                                    Kjellman Auto Portal
                                </button>
                            </div>
                            <div className="sidemenu-items">
                                <button
                                    value={ComponentEnums.addInventory}
                                    onClick={(e) => openComponent(e)}
                                >
                                    <FontAwesomeIcon icon={faUpload} /> Ladda
                                    upp fordon
                                </button>
                                <button
                                    value={ComponentEnums.inventory}
                                    onClick={(e) => openComponent(e)}
                                >
                                    <FontAwesomeIcon icon={faWarehouse} /> Lager
                                </button>
                                <button
                                    value={ComponentEnums.economy}
                                    onClick={(e) => openComponent(e)}
                                >
                                    <FontAwesomeIcon icon={faCashRegister} />
                                    Ekonomi
                                </button>
                                <button
                                    value={ComponentEnums.personal}
                                    onClick={(e) => openComponent(e)}
                                >
                                    <FontAwesomeIcon icon={faUsers} />
                                    Personal
                                </button>
                                <Link to={routePaths.home}>Till hemsidan</Link>
                            </div>
                            <div className="sidemenu-user">
                                <button
                                    value={ComponentEnums.userProfile}
                                    onClick={(e) => openComponent(e)}
                                >
                                    <FontAwesomeIcon icon={faUser} size="lg" />{' '}
                                    Mina uppgifter
                                </button>
                                <FontAwesomeIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={onLogout}
                                    icon={faRightFromBracket}
                                    size="2x"
                                    color="white"
                                />
                            </div>
                        </div>
                    </div>
                )}
                {!toggleSideMenu && (
                    <div className="toggle-menu">
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            onClick={toggleMenu}
                            color="black"
                            style={{ cursor: 'pointer' }}
                            size="2x"
                        />
                    </div>
                )}
                <div
                    className={`dashboard-content${
                        toggleSideMenu ? ' with-sidemenu' : ''
                    }`}
                >
                    {component && (
                        <>
                            {component === ComponentEnums.inventory && (
                                <Inventory />
                            )}
                            {component === ComponentEnums.economy && (
                                <Economy />
                            )}
                            {component === ComponentEnums.personal && (
                                <Personal />
                            )}
                            {component === ComponentEnums.userProfile && (
                                <UserProfile />
                            )}
                            {component === ComponentEnums.main && <Main />}
                            {component === ComponentEnums.addInventory && (
                                <AddInventory />
                            )}
                        </>
                    )}
                </div>
            </div>

            {logoutModal && (
                <CustomModal
                    headerText={'Vill du logga ut?'}
                    onClose={onCloseModal}
                    onSubmit={logOut}
                />
            )}
        </>
    )
}

export default DashBoard
