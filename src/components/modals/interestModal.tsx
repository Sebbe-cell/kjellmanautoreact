import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import clsx from 'clsx'

import { faCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { apiBaseUrl } from '../../api/apiUrl'
import { apiEndpoints } from '../../api/endpoints'
import Loader from '../loader'
import FormInput from '../formInput'
import 'react-toastify/dist/ReactToastify.css';

interface IInterestModalProps {
    headerText: string
    onClose: () => void
}

interface ICarDetails {
    regNr: string
    milage: number
    telephone: number
    email: string
}

enum FormGroup {
    regNr = 'regNr',
    milage = 'milage',
    telephone = 'telephone',
    email = 'email'
}

const InterestModal = (props: IInterestModalProps): JSX.Element => {
    const { headerText, onClose } = props

    const [loading, setLoading] = useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [tradeIn, setTradeIn] = useState<boolean>(false)
    const [errors, setErrors] = useState<{ [key in FormGroup]: boolean }>({
        regNr: false,
        milage: false,
        telephone: false,
        email: false
    })
    const [initialValues, setInitialValues] = useState<ICarDetails>({
        regNr: '',
        milage: 0,
        telephone: 0,
        email: ''
    })

    const handleTradeInClick = (): void => {
        setTradeIn(!tradeIn)
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void => {
        const { name, value } = e.target

        setInitialValues({
            ...initialValues,
            [name]: value
        })

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false
        }))
    }

    const handleValidationOnSubmit = (): boolean => {
        let hasErrors = false

        if (!initialValues.regNr && tradeIn === true) {
            errors.regNr = true
            hasErrors = true
        } else {
            errors.regNr = false
        }

        if (!initialValues.milage && tradeIn === true) {
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

        if (!initialValues.telephone) {
            errors.telephone = true
            hasErrors = true
        } else {
            errors.telephone = false
        }

        setErrors({ ...errors })

        return !hasErrors
    }

    const onSubmit = async (): Promise<void> => {
        const isValid = handleValidationOnSubmit()
        const emailData = {
            from: `KjellmanAuto <joakim@kjellmanauto.se>`,
            to: 'joakim@kjellmanauto.se',
            subject: `Intresseanmälan på ${headerText}`,
            text: tradeIn
                ? 'Inbyte - Reg nr: ' +
                  initialValues.regNr +
                  'Inbyte - Miltal: ' +
                  initialValues.milage
                : '' +
                  'Kundens email: ' +
                  initialValues.email +
                  'Kundens telefonnummer: ' +
                  initialValues.telephone
        }
        if (isValid) {
            setLoading(true)
            try {
                await axios.post(
                    apiBaseUrl + apiEndpoints.sendEmail,
                    emailData,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                setIsSubmitted(true)
                setLoading(false)
            } catch (error: any) {
                setLoading(false)
                toast.error(
                    `Kunde inte skicka mail. Felkod: ${error.message}`,
                    {
                        position: 'bottom-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    }
                )
            }
        } else {
            setErrors({ ...errors })
        }
    }

    return (
        <div className='modal'>
            {loading && <Loader modalContainer={true} />}
            <ToastContainer />
            <div className='modal-container'>
                <div className='modal-header'>
                    <h1>{`Intresseanmälan för ${headerText}`}</h1>
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        size='xl'
                        onClick={onClose}
                    />
                </div>
                <div className='modal-body'>
                    <>
                        <FormInput
                            label={'E-post adress*'}
                            id={'E-post adress'}
                            name={FormGroup.email}
                            value={initialValues.email}
                            onChange={handleInputChange}
                            type='email'
                            optionalInputStyle={{
                                border: errors.email ? '2px solid red' : '',
                                fontSize: errors.email ? '16px' : ''
                            }}
                            placeholder={
                                errors.email ? 'Obligatoriskt fält' : ''
                            }
                        />
                        <FormInput
                            label={'Telefonnummer*'}
                            id={'Telefonnummer'}
                            name={FormGroup.telephone}
                            value={
                                initialValues.telephone === 0
                                    ? ''
                                    : initialValues.telephone
                            }
                            onChange={handleInputChange}
                            type='number'
                            onKeyDown={(evt) =>
                                evt.key === 'e' && evt.preventDefault()
                            }
                            optionalInputStyle={{
                                border: errors.telephone ? '2px solid red' : '',
                                fontSize: errors.telephone ? '16px' : ''
                            }}
                            placeholder={
                                errors.telephone ? 'Obligatoriskt fält' : ''
                            }
                        />
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                marginBottom: '-2rem'
                            }}>
                            <p>Jag har ett inbyte</p>
                            <div
                                onClick={handleTradeInClick}
                                className={clsx(
                                    'input-checkbox',
                                    tradeIn
                                        ? 'input-checkbox-clicked'
                                        : 'input-checkbox'
                                )}>
                                {tradeIn && <FontAwesomeIcon icon={faCheck} />}
                            </div>
                        </div>
                        {tradeIn && (
                            <div className='modal-input'>
                                <FormInput
                                    label={'Registreringsnummer*'}
                                    id={'Registreringsnummer'}
                                    name={FormGroup.regNr}
                                    value={initialValues.regNr}
                                    onChange={handleInputChange}
                                    type='text'
                                    optionalInputStyle={{
                                        border: errors.regNr
                                            ? '2px solid red'
                                            : '',
                                        fontSize: errors.regNr ? '16px' : '',
                                        textTransform: !errors.regNr
                                            ? 'uppercase'
                                            : 'none'
                                    }}
                                    placeholder={
                                        errors.regNr ? 'Obligatoriskt fält' : ''
                                    }
                                />
                                <FormInput
                                    label={'Miltal*'}
                                    id={'Miltal'}
                                    name={FormGroup.milage}
                                    value={
                                        initialValues.milage === 0
                                            ? ''
                                            : initialValues.milage
                                    }
                                    onChange={handleInputChange}
                                    type='number'
                                    onKeyDown={(evt) =>
                                        evt.key === 'e' && evt.preventDefault()
                                    }
                                    optionalInputStyle={{
                                        border: errors.milage
                                            ? '2px solid red'
                                            : '',
                                        fontSize: errors.milage ? '16px' : ''
                                    }}
                                    placeholder={
                                        errors.milage
                                            ? 'Obligatoriskt fält'
                                            : ''
                                    }
                                    optionalText={'mil'}
                                />
                            </div>
                        )}
                    </>
                </div>
                <div className='modal-footer'>
                    {!isSubmitted ? (
                        <button
                            type='submit'
                            className='modal-btn'
                            onClick={onSubmit}>
                            Skicka
                        </button>
                    ) : (
                        <>
                            <button
                                type='button'
                                className='modal-btn'
                                onClick={onClose}>
                                Stäng
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InterestModal
