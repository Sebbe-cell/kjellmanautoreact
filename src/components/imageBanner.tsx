import { Link } from "react-router-dom"

interface IImageBannerProps {
    header: string
    description: string
    btnText: string
    url: string
    logo: string
}

const ImageBanner = (props: IImageBannerProps): JSX.Element => {
    const {header, description, logo, url, btnText} = props
    return (
        <div className="ka-new">
        <img src={logo} alt="" />
        <div className="ka-container">
            <h1>{header}</h1>
            <p>{description}</p>
            <Link to={url}>
                <button className="btn">{btnText}</button>
            </Link>
        </div>
    </div>
    )
}

export default ImageBanner