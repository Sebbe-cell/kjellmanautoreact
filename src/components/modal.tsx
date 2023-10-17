import { useState } from 'react'
import '../css/modal.css'
import FormInput from './formInput'
import FormTextArea from './formTextarea'

interface IModalProps {
    headerText?: string
    submittedText?: string
    onClose: () => void
}

interface ICarDetails {
    regNr: string
    make: string
    modell: string
    milage: number | undefined | string
    telephone: number | undefined | string
    email: string
}

export enum FormGroup {
    regNr = 'regNr',
    make = 'make',
    modell = 'modell',
    milage = 'milage',
    telephone = 'telephone',
    email = 'email',
}

const Modal = (props: IModalProps): JSX.Element => {
    const { headerText, submittedText, onClose } = props

    const [errors, setErrors] = useState<{ [key in FormGroup]: boolean }>({
        regNr: false,
        make: false,
        modell: false,
        milage: false,
        telephone: false,
        email: false,
    })
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [initialValues, setInitialValues] = useState<ICarDetails>({
        regNr: '',
        make: '',
        modell: '',
        milage: undefined,
        telephone: undefined,
        email: '',
    })

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target

        setInitialValues({
            ...initialValues,
            [name]: value,
        })

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }))
    }

    const handleDropdownChange = (e: any) => {
        const { name, value } = e.target

        setInitialValues({
            ...initialValues,
            [name]: value,
        })

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }))
    }

    const handleValidationOnSubmit = (): boolean => {
        let hasErrors = false

        if (!initialValues.regNr) {
            errors.regNr = true
            hasErrors = true
        } else {
            errors.regNr = false
        }

        if (!initialValues.make) {
            errors.make = true
            hasErrors = true
        } else {
            errors.make = false
        }

        if (!initialValues.modell) {
            errors.modell = true
            hasErrors = true
        } else {
            errors.modell = false
        }

        if (!initialValues.milage) {
            errors.milage = true
            hasErrors = true
        } else {
            errors.milage = false
        }

        if (!initialValues.email) {
            errors.email = true
            hasErrors = true
        } else {
            errors.email = false
        }

        setErrors({ ...errors })

        return !hasErrors
    }

    const onSubmit = (): void => {
        const isValid = handleValidationOnSubmit()
        if (isValid) {
            setIsSubmitted(true)
        } else {
            setErrors({ ...errors })
        }
    }

    return (
        <>
            <div className="modal">
                <div className="modal-container">
                    <div className="modal-header">
                        <h1>{isSubmitted ? submittedText : headerText}</h1>
                    </div>
                    <div className="modal-body">
                        {isSubmitted ? (
                            <>
                                <h3>
                                    Vi kommer att höra av oss inom 24 timmar med
                                    ett bud.
                                </h3>
                            </>
                        ) : (
                            <>
                            <FormTextArea label={'asdasd'} id={'dasasd'}/>
                                <FormInput
                                    label={'Registreringsnummer*'}
                                    id={'Registreringsnummer'}
                                    name={FormGroup.regNr}
                                    value={initialValues.regNr}
                                    onChange={(e) => handleInputChange(e)}
                                    type="text"
                                    optionalClass={true}
                                    optionalInputStyle={{
                                        border: errors.regNr
                                            ? '2px solid red'
                                            : '',
                                    }}
                                />
                                <FormInput
                                    label={'Märke*'}
                                    id={'Märke'}
                                    name={FormGroup.make}
                                    value={initialValues.make}
                                    onChange={(e) => handleInputChange(e)}
                                    type="text"
                                    optionalClass={true}
                                    optionalInputStyle={{
                                        border: errors.make
                                            ? '2px solid red'
                                            : '',
                                    }}
                                />
                                <FormInput
                                    label={'Modell*'}
                                    id={'Modell'}
                                    name={FormGroup.modell}
                                    value={initialValues.modell}
                                    onChange={(e) => handleInputChange(e)}
                                    type="text"
                                    optionalClass={true}
                                    optionalInputStyle={{
                                        border: errors.modell
                                            ? '2px solid red'
                                            : '',
                                    }}
                                />
                                <FormInput
                                    label={'Miltal*'}
                                    id={'Miltal'}
                                    name={FormGroup.milage}
                                    value={initialValues.milage}
                                    onChange={(e) => handleInputChange(e)}
                                    type="number"
                                    optionalClass={true}
                                    optionalInputStyle={{
                                        border: errors.milage
                                            ? '2px solid red'
                                            : '',
                                    }}
                                />
                                <FormInput
                                    label={'E-post adress*'}
                                    id={'E-post adress'}
                                    name={FormGroup.email}
                                    value={initialValues.email}
                                    onChange={(e) => handleInputChange(e)}
                                    type="email"
                                    optionalClass={true}
                                    optionalInputStyle={{
                                        border: errors.email
                                            ? '2px solid red'
                                            : '',
                                    }}
                                />
                                <FormInput
                                    label={'Telefonnummer'}
                                    id={'Telefonnummer'}
                                    name={FormGroup.telephone}
                                    value={initialValues.telephone}
                                    onChange={(e) => handleInputChange(e)}
                                    type="number"
                                    optionalClass={true}
                                    optionalInputStyle={{
                                        border: errors.telephone
                                            ? '2px solid red'
                                            : '',
                                    }}
                                />
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn"
                            onClick={onClose}
                        >
                            Stäng
                        </button>
                        {!isSubmitted && (
                            <button
                                type="submit"
                                className="btn"
                                onClick={onSubmit}
                            >
                                Skicka
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
