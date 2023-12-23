import clsx from 'clsx'
import { Link } from 'react-router-dom'

interface IImageBannerProps {
    header: string
    description: string
    btnText: string
    url: string
    logo: string
}

const ImageBanner = (props: IImageBannerProps): JSX.Element => {
    const { header, description, logo, url, btnText } = props

    const isMobile = window.innerWidth <= 768
    return (
        <div className='ka-new'>
            <img src={logo} alt='' />
            <div className='ka-container'>
                <h1>{header}</h1>
                <Link to={url}>
                    <div id='container'>
                        <button className={clsx(!isMobile ? 'learn-more-1' : 'btn-secondary')}>
                            <span className='circle' aria-hidden='true'>
                                <span className='icon arrow'></span>
                            </span>
                            <span className='button-text'>{btnText}</span>
                        </button>
                    </div>
                </Link>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ImageBanner
