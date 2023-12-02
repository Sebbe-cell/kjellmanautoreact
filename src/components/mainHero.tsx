import { useState } from 'react'
import { Link } from 'react-router-dom'

import { routePaths } from '../utils/routePaths'
import videoBg from '../assets/snow1.mp4'
import logo from '../assets/vit.svg'
import '../css/hero.css'

interface IMainHeroProps {
    handleOpenModal: () => void
}

const MainHero = (props: IMainHeroProps): JSX.Element => {
    const { handleOpenModal } = props

    const [videoLoaded, setVideoLoaded] = useState<boolean>(false)

    return (
        <>
            <div className='kjellman-auto-hero'>
                {!videoLoaded && <div>Laddar...</div>}
                <video
                    className={`video-player ${videoLoaded ? 'loaded' : ''}`}
                    src={videoBg}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                    onLoadedData={() => setVideoLoaded(true)}
                />
                <div className='kjellman-auto-hero-container'>
                    <div>
                        <img className='' style={{width: '100%', height: 'auto', maxWidth: '800px', maxHeight: '500px', objectFit: 'cover'}} src={logo} alt='logo' />
                        <div className='btn-container'>
                            <Link to={routePaths.inventory}>
                                <button className='btn'>Köp</button>
                            </Link>
                            <button onClick={handleOpenModal} className='btn'>
                                Sälj
                            </button>
                            <Link to={routePaths.contact}>
                                <button className='btn'>Kontakt</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainHero
