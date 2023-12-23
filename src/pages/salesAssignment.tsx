import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { apiBaseUrl } from '../api/apiUrl'
import { apiEndpoints } from '../api/endpoints'
import herologo from '../assets/highwayy.jpg'
import FormInput from '../components/formInput'
import FormTextArea from '../components/formTextarea'
import Hero from '../components/hero'
import axios from 'axios'
import Loader from '../components/loader'
import '../css/modal.css'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import PolicyModal from '../components/modals/policyModal'

enum FormGroup {
    regNr = 'regNr',
    milage = 'milage',
    telephone = 'telephone',
    email = 'email',
    information = 'information',
    price = 'price',
    checkbox = 'checkbox'
}
interface ICarDetails {
    regNr: string
    milage: number
    telephone: number
    email: string
    price: number
    information?: string | null | undefined
    [key: string]: string | number | undefined | null
}

interface IFormFields {
    label: string
    id: string
    name: FormGroup
    value: string | number | undefined
    type: string
}

const SalesAssignment = (): JSX.Element => {
    type State<T> = {
        [K in keyof T]: boolean
    }

    const initialErrors: State<ICarDetails> = {
        regNr: false,
        milage: false,
        telephone: false,
        email: false,
        price: false,
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
        price: 0,
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

    const handleOpenModal = (): void => {
        setPolicyWindow(true)
        document.body.classList.add('disable-background-scroll')
    }

    const handleCloseModal = (): void => {
        setPolicyWindow(false)
        document.body.classList.remove('disable-background-scroll')
    }

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
        const requiredFields: FormGroup[] = [
            FormGroup.regNr,
            FormGroup.milage,
            FormGroup.email,
            FormGroup.price,
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
            subject: 'Försäljningsuppdrag',
            text:
                'Information: ' +
                initialValues.information +
                'Miltal: ' +
                initialValues.milage +
                'Reg nr: ' +
                initialValues.regNr +
                'Önskat pris: ' +
                initialValues.price +
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
            <Hero imgSrc={herologo} />
            <div className='text-container'>
                <div>
                    <h1>Försäljningsuppdrag</h1>
                    <div>
                        <h2>
                            Vill du göra dig av med din bil på ett smidigt sätt
                            och samtidigt få det bästa möjliga priset?
                        </h2>
                        <p>
                            Då har vi den perfekta lösningen för dig - vårt
                            säljuppdrag.
                        </p>
                        <p>
                            Att sälja sin bil själv kan vara både tidskrävande
                            och krångligt, men med vår hjälp slipper du dessa
                            bekymmer.
                        </p>
                        <p>
                            Vi har en bred kundkrets för bilförsäljning och ett
                            omfattande nätverk. När du väljer att sälja din bil
                            genom oss, tar vi hand om allt. Vi granskar noggrant
                            bilens fysiska skick och dokumentation, och sedan
                            marknadsför vi den på samma exklusiva sätt som vi
                            gör med våra egna bilar.
                        </p>
                    </div>
                    <div>
                        <p>
                            <span>
                                Det enda du behöver göra är att fylla i dina
                                kontaktuppgifter i formuläret nedan.
                            </span>{' '}
                            Inom 48 timmar kommer den ansvariga personen att
                            höra av sig till dig med en närmare värdering av din
                            bil, presentera ett förslag och beskriva hur hela
                            processen kommer att gå till.
                        </p>
                        <p>
                            Om du föredrar att prata direkt med oss, kan du
                            ringa oss på telefonnummer:{' '}
                            <a href='tel:+46 (0)8-400 687 86'>
                                +46 (0)8-400 687 86
                            </a>
                        </p>
                        <p>
                            Vi ser fram emot att hjälpa dig att få det bästa
                            priset för din bil!
                        </p>
                        <div className='divider-2'></div>
                    </div>
                </div>
            </div>

            <div className='sell-form-container'>
                {loading && <Loader modalContainer={true} />}
                <ToastContainer />
                <div>
                    <h1 style={{ margin: '0' }}>
                        {isSubmitted ? 'Tack!' : 'Bilens uppgifter'}
                    </h1>
                </div>
                {isSubmitted ? (
                    <div className=''>
                        <p>
                            Vi uppskattar att du valt att använda vår tjänst för
                            att sälja din bil och vi ser fram emot att hjälpa
                            dig genom hela försäljningsprocessen.
                        </p>
                        <p>{`Vi kommer att kontakta dig på din angivna e-post (${initialValues.email}) adress när värderingen är klar.`}</p>
                    </div>
                ) : (
                    <>
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
                        <FormInput
                            label={'Önskat pris*'}
                            id={'Price'}
                            name={FormGroup.price}
                            value={
                                initialValues.price === 0
                                    ? ''
                                    : initialValues.price
                            }
                            onChange={handleInputChange}
                            type='number'
                            optionalInputStyle={{
                                border: errors.price ? '2px solid red' : '',
                                fontSize: errors.price ? '16px' : ''
                            }}
                            placeholder={
                                errors.price ? 'Obligatoriskt fält' : ''
                            }
                            optionalText={'kr'}
                        />
                        <FormTextArea
                            label={'Övrig info / Eventuella brister'}
                            id={'Info'}
                            name={FormGroup.information}
                            value={initialValues.information ?? ''}
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
                                Skicka in dina biluppgifter
                            </button>
                        </div>
                    </>
                )}
            </div>

            {policyWindow && (
                <PolicyModal onClosePolicyWindow={handleCloseModal} />
            )}
        </>
    )
}

export default SalesAssignment
