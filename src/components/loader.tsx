import '../css/loader.css'

interface ILoaderProps {
    shouldHaveContainer?: boolean
    modalContainer?: boolean
}

const Loader = (props: ILoaderProps): JSX.Element => {
    const { shouldHaveContainer, modalContainer } = props

    return (
        <>
            <div className={modalContainer ? 'test' : ''}>
                <div className={shouldHaveContainer ? 'spinner-container' : ''}>
                    <div className='spinner'></div>
                </div>
            </div>
        </>
    )
}

export default Loader
