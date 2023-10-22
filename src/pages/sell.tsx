import { useState } from 'react'
import road from '../assets/gearknobbig.jpg'
import Hero from '../components/hero'
import FormInput from '../components/formInput'
import { FormGroup } from '../components/modal'
import RoundedCardWithImage from '../components/roundedCardWithImage'
import value from '../assets/value.jpg'
import assessment from '../assets/assesment.jpg'
import cash from '../assets/cash.jpg'
import transfer from '../assets/transfer.jpg'
import { sellFormInfoAfter, ISellFormInfoAfter } from '../utils/sellFormAfter'

interface ICarDetails {
    regNr: string
    make: string
    modell: string
    milage: number | undefined | string
    telephone: number | undefined | string
    email: string
    [key: string]: string | number | undefined
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
}

const Sell = (): JSX.Element => {
    type State<T> = {
        [K in keyof T]: boolean
    }

    const initialErrors: State<ICarDetails> = {
        regNr: false,
        make: false,
        modell: false,
        milage: false,
        telephone: false,
        email: false,
    }

    const [errors, setErrors] = useState<State<ICarDetails>>(initialErrors)
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

    const handleValidationOnSubmit = (): boolean => {
        const requiredFields: FormGroup[] = [
            FormGroup.regNr,
            FormGroup.make,
            FormGroup.modell,
            FormGroup.milage,
            FormGroup.email,
        ]
        let hasErrors = false

        requiredFields.forEach((fieldName) => {
            if (!initialValues[fieldName]) {
                errors[fieldName] = true
                hasErrors = true
            } else {
                errors[fieldName] = false
            }
        })

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

    const formFields: IFormFields[] = [
        {
            label: 'Registreringsnummer*',
            id: 'Registreringsnummer',
            name: FormGroup.regNr,
            value: initialValues.regNr,
        },
        {
            label: 'Märke*',
            id: 'Märke',
            name: FormGroup.make,
            value: initialValues.make,
        },
        {
            label: 'Modell*',
            id: 'Modell',
            name: FormGroup.modell,
            value: initialValues.modell,
        },
        {
            label: 'Miltal*',
            id: 'Miltal',
            name: FormGroup.milage,
            value: initialValues.milage,
        },
        {
            label: 'E-post adress*',
            id: 'E-post adress',
            name: FormGroup.email,
            value: initialValues.email,
        },
        {
            label: 'Telefonnummer',
            id: 'Telefonnummer',
            name: FormGroup.telephone,
            value: initialValues.telephone,
        },
    ]

    const sellStepsFields: ISellStepsFields[] = [
        {
            logo: value,
            title: '1. Professionell värdering',
        },
        {
            logo: cash,
            title: '2. Erbjudande som reflekterar värdet',
        },
        {
            logo: assessment,
            title: '3. Bilinspektion och godkännande',
        },
        {
            logo: transfer,
            title: '4. Snabb och säker överföring',
        },
    ]

    return (
        <>
            <Hero imgSrc={road} />
            <div className="text-container">
                <div>
                    <h1>Vi köper din bil</h1>
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
                    <div className="divider-2"></div>
                </div>
            </div>

            {!isSubmitted ? (
                <div className="sell-form-container">
                    <div className="">
                        <h1>Fyll i dina uppgifter här</h1>
                    </div>
                    {formFields.map((fields: IFormFields, index: number) => (
                        <FormInput
                            key={index}
                            label={fields.label}
                            id={fields.id}
                            name={fields.name}
                            value={fields.value}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            optionalInputStyle={{
                                border: errors[fields.name]
                                    ? '2px solid red'
                                    : '',
                            }}
                            placeholder={
                                errors[fields.name] ? 'Obligatoriskt fält' : ''
                            }
                        />
                    ))}
                    <div>
                        <button
                            className="btn"
                            type="submit"
                            onClick={onSubmit}
                        >
                            Skicka
                        </button>
                    </div>
                </div>
            ) : (
                <div className="sell-form-container">
                    <div>
                        <h1>Tack!</h1>
                        <p>
                            Vi uppskattar att du valt att använda vår tjänst för
                            att sälja din bil och vi ser fram emot att hjälpa
                            dig genom hela försäljningsprocessen. Här är vad som
                            händer nu:
                        </p>
                        {sellFormInfoAfter.map(
                            (info: ISellFormInfoAfter, key: number) => (
                                <>
                                    <div
                                        key={key}
                                        className="sell-form-info-after"
                                    >
                                        <div></div>
                                        <p>{info.title}</p>
                                    </div>
                                    <p>{info.description}</p>
                                </>
                            )
                        )}
                        <div style={{ marginTop: '2rem' }}>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="btn"
                            >
                                Värdera annan bil
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="sell-steps-container">
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
        </>
    )
}

export default Sell
