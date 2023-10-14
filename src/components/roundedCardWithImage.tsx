interface IRoundedCardWithImageProps {
    logo: string
    title: string
    description: string
}

const RoundedCardWithImage = (props: IRoundedCardWithImageProps) => {
    const { logo, description, title } = props
    return (
        <>
            <div className="cards">
                <div className="cards-image-container">
                    <img src={logo} alt={'logo'} className="cards-image" />
                </div>
                <div className="cards-content">
                    <h2 className="cards-title">{title}</h2>
                    <p className="cards-description">{description}</p>
                </div>
            </div>
        </>
    )
}

export default RoundedCardWithImage
