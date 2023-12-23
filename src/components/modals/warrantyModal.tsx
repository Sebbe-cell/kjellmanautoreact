import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import clsx from 'clsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { apiBaseUrl } from '../../api/apiUrl'
import { apiEndpoints } from '../../api/endpoints'
import FormTextArea from '../formTextarea'
import FormInput from '../formInput'
import Loader from '../loader'
import PolicyModal from './policyModal'
import 'react-toastify/dist/ReactToastify.css'
import '../../css/modal.css'

interface ICarDetails {
    regNr: string
    telephone: number
    email: string
    information: string
    dateWhenErrorOccurred: string
    mileageWhenErrorOccurred: number
    currentMileage: number
}

enum FormGroup {
    regNr = 'regNr',
    telephone = 'telephone',
    email = 'email',
    information = 'information',
    dateWhenErrorOccurred = 'dateWhenErrorOccurred',
    mileageWhenErrorOccurred = 'mileageWhenErrorOccurred',
    currentMileage = 'currentMileage',
    checkbox = 'checkbox'
}

interface IWarrantyModalProps {
    headerText: string
    submittedText: string
    onClose: () => void
}

const WarrantyModal = (props: IWarrantyModalProps): JSX.Element => {
    const { headerText, submittedText, onClose } = props

    const [policyWindow, setPolicyWindow] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [errors, setErrors] = useState<{ [key in FormGroup]: boolean }>({
        regNr: false,
        telephone: false,
        email: false,
        information: false,
        dateWhenErrorOccurred: false,
        mileageWhenErrorOccurred: false,
        currentMileage: false,
        checkbox: false
    })
    const [initialValues, setInitialValues] = useState<ICarDetails>({
        regNr: '',
        telephone: 0,
        email: '',
        information: '',
        dateWhenErrorOccurred: '',
        mileageWhenErrorOccurred: 0,
        currentMileage: 0
    })

    const today = new Date().toISOString().split('T')[0] // Get today's date in 'YYYY-MM-DD' format

    useEffect(() => {
        const today = new Date()
        const formattedDate = today.toISOString().substr(0, 10) // Format date as 'YYYY-MM-DD'

        // Update the initial value with today's date
        setInitialValues({
            ...initialValues,
            dateWhenErrorOccurred: formattedDate
        })
    }, []) // Empty dependency array to run the effect only once

    const handleCheckboxChange = (): void => {
        setIsChecked(!isChecked)

        setErrors((prevErrors) => ({
            ...prevErrors,
            checkbox: false
        }))
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
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

        if (!initialValues.regNr) {
            errors.regNr = true
            hasErrors = true
        } else {
            errors.regNr = false
        }

        if (!initialValues.information) {
            errors.information = true
            hasErrors = true
        } else {
            errors.regNr = false
        }

        if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                initialValues.email
            )
        ) {
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

        if (!initialValues.dateWhenErrorOccurred) {
            errors.dateWhenErrorOccurred = true
            hasErrors = true
        } else {
            errors.dateWhenErrorOccurred = false
        }

        if (!initialValues.mileageWhenErrorOccurred) {
            errors.mileageWhenErrorOccurred = true
            hasErrors = true
        } else {
            errors.mileageWhenErrorOccurred = false
        }

        if (!initialValues.currentMileage) {
            errors.currentMileage = true
            hasErrors = true
        } else {
            errors.currentMileage = false
        }

        if (isChecked === false) {
            hasErrors = true
            errors.checkbox = true
        } else {
            errors.checkbox = false
        }

        setErrors({ ...errors })

        return !hasErrors
    }

    const onSubmit = async (): Promise<void> => {
        const isValid = handleValidationOnSubmit()
        const emailData = {
            from: `KjellmanAuto <joakim@kjellmanauto.se>`,
            to: 'joakim@kjellmanauto.se',
            subject: 'Reklamationsformulär',
            text:
                'Information: ' +
                initialValues.information +
                'Miltal idag: ' +
                initialValues.currentMileage +
                'Miltal när problemet uppstod: ' +
                initialValues.mileageWhenErrorOccurred +
                'Datum när problemet uppstod: ' +
                initialValues.dateWhenErrorOccurred +
                'Reg nr: ' +
                initialValues.regNr +
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
        <>
            <div className='modal'>
                {loading && <Loader modalContainer={true} />}
                <ToastContainer />
                <div className='modal-container'>
                    <div className='modal-header'>
                        <h1>{isSubmitted ? submittedText : headerText}</h1>
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            size='xl'
                            onClick={onClose}
                        />
                    </div>
                    <div className='modal-body'>
                        {isSubmitted ? (
                            <>
                                <div>
                                    <p>
                                        Tack för att du har skickat in din
                                        reklamation. Vi förstår vikten av att
                                        lösa problemen med din bil så snabbt som
                                        möjligt. Vårt team kommer att arbeta
                                        hårt för att lösa ditt ärende och
                                        återkomma med en lösning inom en skälig
                                        tidsram.
                                    </p>
                                    <p>
                                        {`Vid återkoppling kommer vi att kontakta dig på din angivna e-post adress: (${initialValues.email})`}
                                        .
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
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
                                    longLabel={
                                        'Datum när problemet upptäcktes*'
                                    }
                                    id={'Date'}
                                    type='date'
                                    name={FormGroup.dateWhenErrorOccurred}
                                    value={initialValues.dateWhenErrorOccurred}
                                    onChange={(e) => handleInputChange(e)}
                                    max={today}
                                    optionalInputStyle={{
                                        border: errors.dateWhenErrorOccurred
                                            ? '2px solid red'
                                            : '',
                                        fontSize: errors.dateWhenErrorOccurred
                                            ? '16px'
                                            : '',
                                        textTransform:
                                            !errors.dateWhenErrorOccurred
                                                ? 'uppercase'
                                                : 'none'
                                    }}
                                    placeholder={
                                        errors.regNr ? 'Obligatoriskt fält' : ''
                                    }
                                />
                                <FormInput
                                    longLabel={
                                        'Mätarställning när problemet uppstod*'
                                    }
                                    id={'MileageError'}
                                    name={FormGroup.mileageWhenErrorOccurred}
                                    type='number'
                                    onKeyDown={(evt) =>
                                        evt.key === 'e' && evt.preventDefault()
                                    }
                                    value={
                                        initialValues.mileageWhenErrorOccurred ===
                                        0
                                            ? ''
                                            : initialValues.mileageWhenErrorOccurred
                                    }
                                    onChange={(e) => handleInputChange(e)}
                                    optionalText={'mil'}
                                    optionalInputStyle={{
                                        border: errors.mileageWhenErrorOccurred
                                            ? '2px solid red'
                                            : '',
                                        fontSize:
                                            errors.mileageWhenErrorOccurred
                                                ? '16px'
                                                : '',
                                        textTransform:
                                            !errors.mileageWhenErrorOccurred
                                                ? 'uppercase'
                                                : 'none'
                                    }}
                                    placeholder={
                                        errors.mileageWhenErrorOccurred
                                            ? 'Obligatoriskt fält'
                                            : ''
                                    }
                                />
                                <FormInput
                                    label={'Mätarställning idag*'}
                                    id={'CurrentMileage'}
                                    name={FormGroup.currentMileage}
                                    type='number'
                                    onKeyDown={(evt) =>
                                        evt.key === 'e' && evt.preventDefault()
                                    }
                                    value={
                                        initialValues.currentMileage === 0
                                            ? ''
                                            : initialValues.currentMileage
                                    }
                                    onChange={(e) => handleInputChange(e)}
                                    optionalText={'mil'}
                                    optionalInputStyle={{
                                        border: errors.currentMileage
                                            ? '2px solid red'
                                            : '',
                                        fontSize: errors.currentMileage
                                            ? '16px'
                                            : '',
                                        textTransform: !errors.currentMileage
                                            ? 'uppercase'
                                            : 'none'
                                    }}
                                    placeholder={
                                        errors.currentMileage
                                            ? 'Obligatoriskt fält'
                                            : ''
                                    }
                                />
                                <FormTextArea
                                    label={'Beskriv ditt ärende*'}
                                    id={'Info'}
                                    name={FormGroup.information}
                                    value={initialValues.information}
                                    onChange={handleInputChange}
                                    optionalInputStyle={{
                                        border: errors.information
                                            ? '2px solid red'
                                            : '',
                                        fontSize: errors.information
                                            ? '16px'
                                            : '',
                                        textTransform: !errors.information
                                            ? 'uppercase'
                                            : 'none'
                                    }}
                                    placeholder={
                                        errors.information
                                            ? 'Obligatoriskt fält'
                                            : ''
                                    }
                                />
                                <FormInput
                                    label={'E-post adress*'}
                                    id={'E-post adress'}
                                    name={FormGroup.email}
                                    value={initialValues.email}
                                    onChange={handleInputChange}
                                    type='email'
                                    optionalInputStyle={{
                                        border: errors.email
                                            ? '2px solid red'
                                            : '',
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
                                        border: errors.telephone
                                            ? '2px solid red'
                                            : '',
                                        fontSize: errors.telephone ? '16px' : ''
                                    }}
                                    placeholder={
                                        errors.telephone
                                            ? 'Obligatoriskt fält'
                                            : ''
                                    }
                                />
                                <div style={{ display: 'flex', gap: '.5rem' }}>
                                    <div>
                                        <div
                                            onClick={handleCheckboxChange}
                                            className={clsx(
                                                'input-checkbox',
                                                isChecked
                                                    ? 'input-checkbox-clicked'
                                                    : 'input-checkbox'
                                            )}>
                                            {isChecked && (
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        style={
                                            errors.checkbox
                                                ? { color: 'red' }
                                                : { color: 'white' }
                                        }>
                                        Jag samtycker till att mina
                                        personuppgifter hanteras enligt{' '}
                                        <span
                                            onClick={() =>
                                                setPolicyWindow(true)
                                            }
                                            style={
                                                errors.checkbox
                                                    ? {
                                                          color: 'red',
                                                          cursor: 'pointer'
                                                      }
                                                    : {
                                                          color: 'rgb(211, 174, 95)',
                                                          cursor: 'pointer'
                                                      }
                                            }>
                                            integritetspolicyn.*
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className='modal-footer'>
                        {isSubmitted ? (
                            <button
                                type='button'
                                className='modal-btn'
                                onClick={onClose}>
                                Stäng
                            </button>
                        ) : (
                            <button
                                type='submit'
                                className='modal-btn'
                                onClick={onSubmit}>
                                Skicka ärende
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {policyWindow && (
                <PolicyModal
                    onClosePolicyWindow={() => setPolicyWindow(false)}
                />
            )}
        </>
    )
}

export default WarrantyModal
