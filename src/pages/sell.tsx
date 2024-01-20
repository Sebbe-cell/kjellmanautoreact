import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { apiBaseUrl } from '../api/apiUrl'
import { apiEndpoints } from '../api/endpoints'
import { sellFormInfoAfter, ISellFormInfoAfter } from '../utils/sellFormAfter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import road from '../assets/uppdragstor.jpg'
import clsx from 'clsx'
import Hero from '../components/hero'
import FormInput from '../components/formInput'
import RoundedCardWithImage from '../components/roundedCardWithImage'
import value from '../assets/meter.jpg'
import assessment from '../assets/assesment.jpg'
import cash from '../assets/offer.jpg'
import transfer from '../assets/transfer.jpg'
import FormTextArea from '../components/formTextarea'
import axios from 'axios'
import Loader from '../components/loader'
import PolicyModal from '../components/modals/policyModal'
import 'react-toastify/dist/ReactToastify.css'
import '../css/modal.css'
import { Helmet } from 'react-helmet'

export enum FormGroup {
    regNr = 'regNr',
    milage = 'milage',
    telephone = 'telephone',
    email = 'email',
    information = 'information',
    checkbox = 'checkbox'
}
interface ICarDetails {
    regNr: string
    milage: number
    telephone: number
    email: string
    [key: string]: string | number
}

interface ISellStepsFields {
    title: string
    logo: string
}

interface IFormFields {
    label: string
    id: string
    name: FormGroup
    value: string | number | undefined
    type: string
}

const Sell = (): JSX.Element => {
    type State<T> = {
        [K in keyof T]: boolean
    }

    const initialErrors: State<ICarDetails> = {
        regNr: false,
        milage: false,
        telephone: false,
        email: false,
        checkbox: false
    }

    const [policyWindow, setPolicyWindow] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<State<ICarDetails>>(initialErrors)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [initialValues, setInitialValues] = useState<ICarDetails>({
        regNr: '',
        milage: 0,
        telephone: 0,
        email: '',
        information: ''
    })

    const formFields: IFormFields[] = [
        {
            label: 'E-post adress*',
            id: 'E-post adress',
            name: FormGroup.email,
            value: initialValues.email,
            type: 'email'
        },
        {
            label: 'Telefonnummer*',
            id: 'Telefonnummer',
            name: FormGroup.telephone,
            value: initialValues.telephone,
            type: 'number'
        }
    ]

    const inlineFormFields: IFormFields[] = [
        {
            label: 'Registreringsnummer*',
            id: 'Registreringsnummer',
            name: FormGroup.regNr,
            value: initialValues.regNr,
            type: 'text'
        },
        {
            label: 'Miltal*',
            id: 'Miltal',
            name: FormGroup.milage,
            value: initialValues.milage,
            type: 'number'
        }
    ]

    const sellStepsFields: ISellStepsFields[] = [
        {
            logo: value,
            title: '1. Professionell värdering'
        },
        {
            logo: cash,
            title: '2. Erbjudande som reflekterar värdet'
        },
        {
            logo: assessment,
            title: '3. Bilinspektion och godkännande'
        },
        {
            logo: transfer,
            title: '4. Snabb och säker överföring'
        }
    ]

    const handleOpenModal = (): void => {
        setPolicyWindow(true)
        document.body.classList.add('disable-background-scroll')
    }

    const handleCloseModal = (): void => {
        setPolicyWindow(false)
        document.body.classList.remove('disable-background-scroll')
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

    const handleCheckboxChange = (): void => {
        setIsChecked(!isChecked)

        setErrors((prevErrors) => ({
            ...prevErrors,
            checkbox: false
        }))
    }

    const handleValidationOnSubmit = (): boolean => {
        const requiredFields: FormGroup[] = [
            FormGroup.regNr,
            FormGroup.milage,
            FormGroup.email,
            FormGroup.telephone
        ]
        let hasErrors = false

        requiredFields.forEach((fieldName) => {
            if (!initialValues[fieldName]) {
                errors[fieldName] = true
                hasErrors = true
            } else {
                errors[fieldName] = false
            }

            if (isChecked === false) {
                hasErrors = true
                errors.checkbox = true
            } else {
                errors.checkbox = false
            }
        })

        setErrors({ ...errors })

        return !hasErrors
    }

    const onSubmit = async (): Promise<void> => {
        const isValid = handleValidationOnSubmit()
        const emailData = {
            from: `KjellmanAuto <joakim@kjellmanauto.se>`,
            to: 'joakim@kjellmanauto.se',
            subject: 'Säljformulär',
            text:
                'Reg nr: ' +
                initialValues.regNr +
                'Miltal: ' +
                initialValues.milage +
                'Information: ' +
                initialValues.information +
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

    const onEvaluteOther = (): void => {
        setIsSubmitted(false)
        const clearedValues: ICarDetails = {
            regNr: '',
            milage: 0,
            telephone: 0,
            email: ''
        }

        setInitialValues(clearedValues)
    }

    return (
        <>
            <Helmet>
                <title>Kjellman Auto - Sälj</title>
                <meta name='description' content='Sälj din bil direkt till oss' />
                <meta name='keywords' content='cars, kjellman, auto, bil' />
            </Helmet>
            <Hero imgSrc={road} />
            <div className='text-container'>
                <div>
                    <h1>Vi köper din bil - En snabb och smidig affär</h1>
                    <p>
                        Om du funderar på att skaffa en ny bil och är osäker på
                        vad du ska göra med din nuvarande, så är det många som
                        väljer att annonsera den på sociala medier, Blocket
                        eller i tidningar. Tyvärr kan det vara en tidskrävande
                        och tråkig process.
                    </p>
                    <p>
                        Men oroa dig inte, på Kjellman Auto är vi mer än villiga
                        att köpa din bil.
                    </p>
                    <p>
                        Fyll i formuläret nedan, och vi kommer att snarast
                        möjligt ge dig ett konkurrenskraftigt erbjudande.
                    </p>
                    <div className='divider-2'></div>
                </div>
            </div>

            {!isSubmitted ? (
                <>
                    <div className='sell-form-container'>
                        {loading && <Loader modalContainer={true} />}
                        <ToastContainer />
                        <div>
                            <h1 style={{ margin: '0' }}>Bilens uppgifter</h1>
                        </div>
                        <div className='modal-input'>
                            {inlineFormFields.map(
                                (fields: IFormFields, index: number) => (
                                    <FormInput
                                        key={index}
                                        label={fields.label}
                                        id={fields.id}
                                        name={fields.name}
                                        value={
                                            fields.value === 0
                                                ? ''
                                                : fields.value
                                        }
                                        onChange={(e) => handleInputChange(e)}
                                        type={fields.type}
                                        optionalInputStyle={{
                                            border: errors[fields.name]
                                                ? '2px solid red'
                                                : ''
                                        }}
                                        placeholder={
                                            errors[fields.name]
                                                ? 'Obligatoriskt fält'
                                                : ''
                                        }
                                        optionalText={
                                            fields.name === FormGroup.milage
                                                ? 'mil'
                                                : ''
                                        }
                                    />
                                )
                            )}
                        </div>
                        <FormTextArea
                            label={'Övrig info / Eventuella brister'}
                            id={'Info'}
                            name={FormGroup.information}
                            value={initialValues.information}
                            onChange={handleInputChange}
                        />
                        {formFields.map(
                            (fields: IFormFields, index: number) => (
                                <FormInput
                                    key={index}
                                    label={fields.label}
                                    id={fields.id}
                                    name={fields.name}
                                    value={
                                        fields.value === 0 ? '' : fields.value
                                    }
                                    onChange={(e) => handleInputChange(e)}
                                    type={fields.type}
                                    optionalInputStyle={{
                                        border: errors[fields.name]
                                            ? '2px solid red'
                                            : ''
                                    }}
                                    placeholder={
                                        errors[fields.name]
                                            ? 'Obligatoriskt fält'
                                            : ''
                                    }
                                />
                            )
                        )}
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
                                        <FontAwesomeIcon icon={faCheck} />
                                    )}
                                </div>
                            </div>
                            <div
                                style={
                                    errors.checkbox
                                        ? { color: 'red' }
                                        : { color: 'white' }
                                }>
                                Jag samtycker till att mina personuppgifter
                                hanteras enligt{' '}
                                <span
                                    onClick={handleOpenModal}
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
                        <div>
                            <button
                                className='modal-btn'
                                type='submit'
                                onClick={onSubmit}>
                                Begär en värdering
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className='sell-form-container'>
                    <div>
                        <h1>Tack!</h1>
                        <p>{`När värderingen är klar kommer vi att kontakta dig på din angivna e-post adress: (${initialValues.email})`}</p>
                        <p>
                            Vi uppskattar att du valt att använda vår tjänst för
                            att sälja din bil och vi ser fram emot att hjälpa
                            dig genom hela försäljningsprocessen. Här är vad som
                            händer nu:
                        </p>
                        {sellFormInfoAfter.map(
                            (info: ISellFormInfoAfter, index: number) => (
                                <React.Fragment key={index}>
                                    <div className='sell-form-info-after'>
                                        <div></div>
                                        <p>{info.title}</p>
                                    </div>
                                    <p>{info.description}</p>
                                </React.Fragment>
                            )
                        )}
                        <div style={{ marginTop: '2rem' }}>
                            <button
                                onClick={onEvaluteOther}
                                className='modal-btn'>
                                Värdera annan bil
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className='sell-steps-container'>
                {sellStepsFields.map(
                    (steps: ISellStepsFields, index: number) => (
                        <RoundedCardWithImage
                            key={index}
                            logo={steps.logo}
                            title={steps.title}
                        />
                    )
                )}
            </div>

            {policyWindow && (
                <PolicyModal onClosePolicyWindow={handleCloseModal} />
            )}
        </>
    )
}

export default Sell
