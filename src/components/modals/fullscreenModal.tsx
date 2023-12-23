import {
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IFullScreenModalProps {
    carData: any
    currentIndex: number
    goToPrevious: () => void
    goToNext: () => void
    handleToggleFullScreen: () => void
}

const FullscreenModal = (props: IFullScreenModalProps): JSX.Element => {
    const {
        goToPrevious,
        goToNext,
        handleToggleFullScreen,
        currentIndex,
        carData
    } = props
    return (
        <div className='fullscreen-container'>
            <div className='fullscreen-wrapper'>
                <div className='fullscreen-img-btn-left'>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        onClick={goToPrevious}
                        size='3x'
                    />
                </div>
                <div className='fullscreen-img-container'>
                    <img alt='' src={carData.image[currentIndex].large[0]} />
                    <div className='fullscreen-toggle-container'>
                        <p onClick={handleToggleFullScreen}>Stäng</p>
                    </div>
                </div>
                <div className='fullscreen-img-btn-right'>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        onClick={goToNext}
                        size='3x'
                    />
                </div>
            </div>
        </div>
    )
}

export default FullscreenModal
