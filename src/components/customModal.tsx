import '../css/modal.css'

interface IModalProps {
    headerText?: string
    onClose: () => void
    onSubmit: () => void
}

const CustomModal = (props: IModalProps): JSX.Element => {
    const { headerText, onClose, onSubmit } = props

    return (
        <>
            <div className="modal">
                <div className="modal-container">
                    <div className="modal-header">
                        <h1>{headerText}</h1>
                    </div>
                    <div className="modal-body">
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn"
                            onClick={onClose}
                        >
                            Nej
                        </button>
                            <button
                                type="submit"
                                className="btn"
                                onClick={onSubmit}
                            >
                                Ja
                            </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomModal
