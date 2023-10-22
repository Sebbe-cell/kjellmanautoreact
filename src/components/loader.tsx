import '../css/loader.css'

interface ILoaderProps {
    shouldHaveContainer?: boolean
}

const Loader = (props: ILoaderProps): JSX.Element => {
    const { shouldHaveContainer } = props

    return (
        <>
            <div className={shouldHaveContainer ? 'spinner-container' : ''}>
                <div className="spinner"></div>
            </div>
        </>
    )
}

export default Loader
