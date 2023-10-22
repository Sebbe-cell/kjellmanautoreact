interface IRoundedCardWithImageProps {
    logo: string
    title: string
    key: number
    description?: string
}

const RoundedCardWithImage = (props: IRoundedCardWithImageProps): JSX.Element => {
    const { logo, description, title } = props
    return (
        <>
            <div className="cards">
                <div className="cards-image-container">
                    <img src={logo} alt={'logo'} className="cards-image" />
                </div>
                <div className="cards-content">
                    <h1 className="cards-title">{title}</h1>
                    <p className="cards-description">{description}</p>
                </div>
            </div>
        </>
    )
}

export default RoundedCardWithImage
