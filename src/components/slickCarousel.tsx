import Slider from 'react-slick'
import '../css/slick.css'
import '../css/slick-theme.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IAlteredVehicleData } from '../utils/interfaces'
import { routePaths } from '../utils/routePaths'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Loader from './loader'

interface ISlickCarouselProps {
    data: any
    loading: boolean
    error: boolean
}

const SlickCarousel = (props: ISlickCarouselProps): JSX.Element => {
    const { data, loading, error } = props
    const [slidesToShow, setSlidesToShow] = useState(calculateSlidesToShow())
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
            setSlidesToShow(calculateSlidesToShow())
        }

        window.addEventListener('resize', handleResize)

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []) // Empty dependency array ensures the effect runs only once on mount

    function calculateSlidesToShow() {
        const windowWidth = window.innerWidth

        if (windowWidth <= 450) {
            return 1
        } else if (windowWidth <= 992) {
            return 2
        } else if (windowWidth <= 1200) {
            return 3
        } else {
            return 4
        }
    }

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2100,
        pauseOnHover: true
    }

    const renderCommonInfo = (d: IAlteredVehicleData): JSX.Element => {
        return (
            <>
                <div className='inventory-description'>
                    <span>{d.modelyear}</span>
                </div>
                <div className='inventory-description'>
                    <span>|</span>
                </div>
                <div className='inventory-description'>
                    <span>{d.miles[0]._}</span>
                </div>
                {windowWidth >= 590 && (
                    <>
                        <div className='inventory-description'>
                            <span>|</span>
                        </div>
                        <div className='inventory-description'>
                            <span>{d.gearbox ?? 'n/a'}</span>
                        </div>
                        <div className='inventory-description'>
                            <span>|</span>
                        </div>
                        <div className='inventory-description'>
                            <span>{d.primaryfuel}</span>
                        </div>
                    </>
                )}
                {windowWidth < 450 && (
                    <>
                        <div className='inventory-description'>
                            <span>|</span>
                        </div>
                        <div className='inventory-description'>
                            <span>{d.gearbox ?? 'n/a'}</span>
                        </div>
                        <div className='inventory-description'>
                            <span>|</span>
                        </div>
                        <div className='inventory-description'>
                            <span>{d.primaryfuel}</span>
                        </div>
                    </>
                )}
            </>
        )
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {!error && (
                        <div className='slick-container'>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                <Link to={routePaths.inventory}>
                                    <h2>Utforska hela lagret</h2>
                                </Link>
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    size='xl'
                                />
                            </div>
                            <Slider {...settings}>
                                {data.map((d: IAlteredVehicleData) => (
                                    <div key={d.$.id}>
                                        <Link
                                            to={`${routePaths.inventory}/${d.$.id}`}>
                                            <div className='slides-slick'>
                                                <div className='image-container'> 
                                                    <img
                                                        src={
                                                            d.image?.[0]
                                                                ?.main[0]
                                                        }
                                                        alt={'preview'}
                                                    />
                                                </div>
                                                <div className='slides-text-container'>
                                                    <p
                                                        style={{
                                                            marginBottom:
                                                                '0.2rem',
                                                            marginRight: '10px'
                                                        }}>
                                                        {d.headline}
                                                    </p>
                                                    <div className='inventory-facts-container'>
                                                        {renderCommonInfo(d)}
                                                    </div>
                                                </div>
                                                <h3>{d.price[0]._}</h3>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default SlickCarousel
