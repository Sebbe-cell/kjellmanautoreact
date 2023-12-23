import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import {
    sellFormInfoAfter,
    ISellFormInfoAfter
} from '../../utils/sellFormAfter'
import { apiBaseUrl } from '../../api/apiUrl'
import { apiEndpoints } from '../../api/endpoints'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import clsx from 'clsx'
import FormTextArea from '../formTextarea'
import Loader from '../loader'
import FormInput from '../formInput'
import PolicyModal from './policyModal'
import 'react-toastify/dist/ReactToastify.css'
import '../../css/modal.css'

interface ICarDetails {
    regNr: string
    milage: number
    telephone: number
    email: string
    information: string
}

export enum FormGroup {
    regNr = 'regNr',
    milage = 'milage',
    telephone = 'telephone',
    email = 'email',
    information = 'information',
    checkbox = 'checkbox'
}

interface IModalProps {
    headerText: string
    submittedText: string
    onClose: () => void
}

const SellModal = (props: IModalProps): JSX.Element => {
    const { headerText, submittedText, onClose } = props

    const [policyWindow, setPolicyWindow] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [errors, setErrors] = useState<{ [key in FormGroup]: boolean }>({
        regNr: false,
        milage: false,
        telephone: false,
        email: false,
        information: false,
        checkbox: false
    })
    const [initialValues, setInitialValues] = useState<ICarDetails>({
        regNr: '',
        milage: 0,
        telephone: 0,
        email: '',
        information: ''
    })

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

    const handleCheckboxChange = (): void => {
        setIsChecked(!isChecked)

        setErrors((prevErrors) => ({
            ...prevErrors,
            checkbox: false
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

        if (!initialValues.milage) {
            errors.milage = true
            hasErrors = true
        } else {
            errors.milage = false
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
            subject: 'Säljformulär',
            text: `Information: ${initialValues.information}\r\n
            Miltal: ${initialValues.milage}\r\n
            Reg nr: ${initialValues.regNr}\r\n
            Kundens email: ${initialValues.email}\r\n
            Kundens telefonnuummer: ${initialValues.telephone}
            `
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
                                        Vi uppskattar att du valt att använda
                                        vår tjänst för att sälja din bil och vi
                                        ser fram emot att hjälpa dig genom hela
                                        försäljningsprocessen.
                                    </p>
                                    <p>{`När värderingen är klar kommer vi att kontakta dig på din angivna e-post adress: (${initialValues.email})`}</p>
                                    <p>Här är vad som händer nu:</p>
                                    {sellFormInfoAfter.map(
                                        (
                                            info: ISellFormInfoAfter,
                                            index: number
                                        ) => (
                                            <React.Fragment key={index}>
                                                <div className='modal-body-after'>
                                                    <div>
                                                        <div></div>
                                                        <p
                                                            style={{
                                                                color: 'rgb(211, 174, 95)'
                                                            }}>
                                                            {info.title}
                                                        </p>
                                                    </div>
                                                    <p
                                                        style={{
                                                            margin: '0',
                                                            paddingLeft:
                                                                '1.1rem'
                                                        }}>
                                                        {info.description}
                                                    </p>
                                                </div>
                                            </React.Fragment>
                                        )
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
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
                                            fontSize: errors.regNr
                                                ? '16px'
                                                : '',
                                            textTransform: !errors.regNr
                                                ? 'uppercase'
                                                : 'none'
                                        }}
                                        placeholder={
                                            errors.regNr
                                                ? 'Obligatoriskt fält'
                                                : ''
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
                                            evt.key === 'e' &&
                                            evt.preventDefault()
                                        }
                                        optionalInputStyle={{
                                            border: errors.milage
                                                ? '2px solid red'
                                                : '',
                                            fontSize: errors.milage
                                                ? '16px'
                                                : ''
                                        }}
                                        placeholder={
                                            errors.milage
                                                ? 'Obligatoriskt fält'
                                                : ''
                                        }
                                        optionalText={'mil'}
                                    />
                                </div>
                                <FormTextArea
                                    label={'Övrig info / Eventuella brister'}
                                    id={'Info'}
                                    name={FormGroup.information}
                                    value={initialValues.information}
                                    onChange={handleInputChange}
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
                                Begär en värdering
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

export default SellModal
