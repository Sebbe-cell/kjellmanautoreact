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

interface ICarDetails {
    regNr: string
    make: string
    modell: string
    milage: number | undefined | string
    telephone: number | undefined | string
    email: string
}

const Sell = (): JSX.Element => {
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
            <Hero imgSrc={road} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div style={{ maxWidth: '80rem', padding: '2rem' }}>
                    <h1>Sätt din bil till försäljning online idag!</h1>
                    <h3>
                        Om du funderar på att skaffa en ny bil och är osäker på
                        vad du ska göra med din nuvarande, så är det många som
                        väljer att annonsera den på sociala medier, Blocket
                        eller i tidningar. Tyvärr kan det vara en tidskrävande
                        och tråkig process.
                    </h3>
                    <h3>
                        Men oroa dig inte, på Kjellman Auto är vi mer än villiga
                        att köpa din bil! Sätt din bil till försäljning online
                        idag!
                    </h3>
                    <div
                        style={{
                            border: '2px solid rgb(211, 174, 95)',
                            marginTop: '2rem',
                        }}
                    ></div>
                </div>
            </div>
            {!isSubmitted ? (
                <>
                    <div className="sell-form-container">
                        <h1>Fyll i dina uppgifter här</h1>
                    </div>
                    <div className="sell-form-container">
                        <FormInput
                            label={'Registreringsnummer*'}
                            id={'Registreringsnummer'}
                            name={FormGroup.regNr}
                            value={initialValues.regNr}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            optionalInputStyle={{
                                border: errors.regNr ? '2px solid red' : '',
                            }}
                            placeholder={
                                errors.regNr ? 'Obligatoriskt fält' : ''
                            }
                        />
                    </div>
                    <div className="sell-form-container">
                        <FormInput
                            label={'Märke*'}
                            id={'Märke'}
                            name={FormGroup.make}
                            value={initialValues.make}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            optionalInputStyle={{
                                border: errors.make ? '2px solid red' : '',
                            }}
                            placeholder={
                                errors.make ? 'Obligatoriskt fält' : ''
                            }
                        />
                    </div>
                    <div className="sell-form-container">
                        <FormInput
                            label={'Modell*'}
                            id={'Modell'}
                            name={FormGroup.modell}
                            value={initialValues.modell}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            optionalInputStyle={{
                                border: errors.modell ? '2px solid red' : '',
                            }}
                            placeholder={
                                errors.modell ? 'Obligatoriskt fält' : ''
                            }
                        />
                    </div>
                    <div className="sell-form-container">
                        <FormInput
                            label={'Miltal*'}
                            id={'Miltal'}
                            name={FormGroup.milage}
                            value={initialValues.milage}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            optionalInputStyle={{
                                border: errors.milage ? '2px solid red' : '',
                            }}
                            placeholder={
                                errors.milage ? 'Obligatoriskt fält' : ''
                            }
                        />
                    </div>
                    <div className="sell-form-container">
                        <FormInput
                            label={'E-post adress*'}
                            id={'E-post adress'}
                            name={FormGroup.email}
                            value={initialValues.email}
                            onChange={(e) => handleInputChange(e)}
                            type="email"
                            required={true}
                            optionalInputStyle={{
                                border: errors.email ? '2px solid red' : '',
                            }}
                            placeholder={
                                errors.email ? 'Obligatoriskt fält' : ''
                            }
                        />
                    </div>
                    <div className="sell-form-container">
                        <FormInput
                            label={'Telefonnummer*'}
                            id={'Telefonnummer'}
                            name={FormGroup.telephone}
                            value={initialValues.telephone}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            optionalInputStyle={{
                                border: errors.telephone ? '2px solid red' : '',
                            }}
                        />
                    </div>
                    <div className="sell-form-container">
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
                </>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ maxWidth: '60rem', padding: '2rem' }}>
                        <h1>Tack!</h1>
                        <h3>
                            Vi uppskattar att du valt att använda vår tjänst för
                            att sälja din bil och vi ser fram emot att hjälpa
                            dig genom hela försäljningsprocessen. Här är vad som
                            händer nu:
                        </h3>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '.5rem',
                                marginBottom: '0',
                            }}
                        >
                            <div
                                style={{
                                    height: '8px',
                                    width: '8px',
                                    backgroundColor: 'rgb(211, 174, 95)',
                                    borderRadius: '50%',
                                }}
                            ></div>
                            <p style={{ color: 'rgb(211, 174, 95)' }}>
                                Granskning av din information:
                            </p>
                        </div>
                        <p style={{ margin: '0', paddingLeft: '1.1rem' }}>
                            Vårt team kommer noggrant granska den information du
                            har skickat in om din bil. Det inkluderar märke,
                            modell, årsmodell, körsträcka och skick. Detta
                            hjälper oss att fastställa ett rättvist och
                            konkurrenskraftigt bud för din bil.
                        </p>
                        <p style={{ color: 'rgb(211, 174, 95)' }}>
                            Uppskattning av värdet:
                        </p>
                        Våra experter kommer att använda den tillhandahållna
                        informationen tillsammans med marknadsdata och andra
                        faktorer för att fastställa ett bud som återspeglar din
                        bils verkliga värde. Vi strävar alltid efter att ge dig
                        det bästa möjliga erbjudandet.
                        <p style={{ color: 'rgb(211, 174, 95)' }}>
                            Kontakt med dig:
                        </p>
                        Efter att vi har fastställt ett bud som vi tror är
                        rimligt, kommer vi att kontakta dig för att diskutera
                        erbjudandet. Vi kan svara på eventuella frågor eller
                        funderingar du har och vi är öppna för att förhandla om
                        priset om det behövs.
                        <p style={{ color: 'rgb(211, 174, 95)' }}>
                            Bilinspektion:
                        </p>
                        Om du accepterar vårt erbjudande, kommer vi att
                        arrangera en tid för att inspektera din bil. Detta görs
                        för att säkerställa att bilen är i det skick du har
                        beskrivit den och för att slutföra
                        försäljningsprocessen.
                        <p style={{ color: 'rgb(211, 174, 95)' }}>
                            Slutförande av försäljning:
                        </p>
                        När bilinspektionen är klar och allt är i ordning,
                        hjälper vi dig att slutföra försäljningen. Vi tar hand
                        om all den administrativa och juridiska hanteringen, så
                        att du kan slappna av och fokusera på det som är
                        viktigast för dig.
                        <p>
                            Vi strävar efter att göra försäljningsprocessen så
                            enkel och smidig som möjligt för dig. Om du har
                            några frågor eller funderingar längs vägen, tveka
                            inte att kontakta oss. Tack igen för att du valde
                            oss för att sälja din bil, och vi ser fram emot att
                            hjälpa dig att slutföra denna affär på ett
                            framgångsrikt sätt. Med vänliga hälsningar, Kjellman
                            Auto
                        </p>
                        <button className="btn">Värdera annan bil</button>
                    </div>
                </div>
            )}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    margin: '4rem 0 4rem 0',
                }}
            >
                <RoundedCardWithImage
                    logo={value}
                    title={'Professionell Värdering'}
                    description={'Vi fastställer din bils värde noggrant'}
                />
                <RoundedCardWithImage
                    logo={cash}
                    title={'Erbjudande som Reflekterar Värdet'}
                    description={'Ett konkurrenskraftigt erbjudande skapas'}
                />
                <RoundedCardWithImage
                    logo={assessment}
                    title={'Bilinspektion och Godkännande'}
                    description={
                        'Vi inspekterar din bil för att säkerställa kvaliteten'
                    }
                />
                <RoundedCardWithImage
                    logo={transfer}
                    title={'Snabb och Säker Överföring'}
                    description={
                        'Pengarna överförs till din angivna betalningsmetod'
                    }
                />
            </div>
        </>
    )
}

export default Sell
