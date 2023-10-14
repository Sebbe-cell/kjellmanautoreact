import { MouseEvent } from 'react'
import road from '../assets/gearknobbig.jpg'
import audi from '../assets/audi46.jpg'
import FindUs from '../components/findus'
import Hero from '../components/hero'
import FormInput from '../components/formInput'

const Sell = (): JSX.Element => {
    const submitForm = (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        e.preventDefault()
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
                    <div style={{border: '2px solid rgb(211, 174, 95)', marginTop: '2rem'}}></div>
                </div>
            </div>
            <div className="sell-form-container">
                <h1>Fyll i dina uppgifter här</h1>
            </div>
            <div className="sell-form-container">
                <FormInput label={'Registreringsnummer'} id={'regnr'} />
            </div>
            <div className="sell-form-container">
                <FormInput label={'Märke'} id={'make'} />
            </div>
            <div className="sell-form-container">
                <FormInput label={'Miltal'} id={'milage'} />
            </div>
            <div className="sell-form-container">
                <FormInput label={'Telefonnummer'} id={'telephone'} />
            </div>
            <div className="sell-form-container">
                <FormInput label={'E-post adress'} id={'address'} />
            </div>
            <div className="sell-form-container">
                <div>
                    <button
                        className="btn"
                        type="submit"
                        onClick={(e) => submitForm(e)}
                    >
                        Skicka
                    </button>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginTop: '4rem',
                }}
            >
                <div className="cards">
                    <div className="cards-image-container">
                        <img src={road} alt={''} className="cards-image" />
                    </div>
                    <div className="cards-content">
                        <h2 className="cards-title">
                            Få rätt pris för din bil
                        </h2>
                        <p className="cards-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Earum a provident ipsam asperiores autem
                            voluptatibus cum ad, dolores sunt odio.
                        </p>
                    </div>
                </div>
                <div className="cards">
                    <div className="cards-image-container">
                        <img src={road} alt={''} className="cards-image" />
                    </div>
                    <div className="cards-content">
                        <h2 className="cards-title">
                            Få dina biluppgifter verifierade
                        </h2>
                        <p className="cards-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Earum a provident ipsam asperiores autem
                            voluptatibus cum ad, dolores sunt odio.
                        </p>
                    </div>
                </div>
                <div className="cards">
                    <div className="cards-image-container">
                        <img src={audi} alt={''} className="cards-image" />
                    </div>
                    <div className="cards-content">
                        <h2 className="cards-title">Få dina pengar</h2>
                        <p className="cards-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Earum a provident ipsam asperiores autem
                            voluptatibus cum ad, dolores sunt odio.
                        </p>
                    </div>
                </div>
                <div className="cards">
                    <div className="cards-image-container">
                        <img src={audi} alt={''} className="cards-image" />
                    </div>
                    <div className="cards-content">
                        <h2 className="cards-title">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Molestias, debitis!
                        </h2>
                        <p className="cards-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Earum a provident ipsam asperiores autem
                            voluptatibus cum ad, dolores sunt odio. Lorem ipsum
                            dolor sit amet, consectetur adipisicing elit. Ullam,
                            officiis!
                        </p>
                    </div>
                </div>
            </div>

            <FindUs />
        </>
    )
}

export default Sell
