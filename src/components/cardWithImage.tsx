import { Link } from 'react-router-dom'

import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/cards.css'

interface ICardWithImageProps {
    logo: string
    title: string
    description?: string
    url: string
}

const CardWithImage = (props: ICardWithImageProps): JSX.Element => {
    const { logo, title, description, url } = props
    return (
        <>
        <div className="cards1">
            <Link to={url}>
            <div className="cards1-image-container">
                    <img src={logo} alt={title} className="cards1-image" />
                </div>
                <div className="cards1-content">
                    <h2 className="cards1-title">{title}</h2>
                    <FontAwesomeIcon
                            icon={faChevronRight}
                        />
                    {description && (
                        <p className="cards1-description">{description}</p>
                    )}
                </div>
            </Link>
            </div>
        </>
    )
}

export default CardWithImage
