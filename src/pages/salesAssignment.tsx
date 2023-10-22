import herologo from '../assets/beachbig.jpg'
import FormInput from '../components/formInput'
import FormTextArea from '../components/formTextarea'
import Hero from '../components/hero'

const SalesAssignment = (): JSX.Element => {
    return (
        <>
            <Hero imgSrc={herologo} />
            <div className="text-container">
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
                            <a
                                href="tel:+46 (0)8-400 687 86"
                            >
                                +46 (0)8-400 687 86
                            </a>
                        </p>
                        <p>
                            Vi ser fram emot att hjälpa dig att få det bästa
                            priset för din bil!
                        </p>
                        <div className="divider-2"></div>
                    </div>
                </div>
            </div>

            <div className="sell-form-container">
                <FormInput label={'Märke'} id={''} />
                <FormInput label={'Modell'} id={''} />
                <FormInput label={'Miltal'} id={''} />
                <FormInput label={'Önskat pris'} id={''} />
                <FormTextArea
                    label={'Övrig info / Eventuella brister'}
                    id={''}
                />
                <FormInput label={'E-post adress'} id={''} />
                <FormInput label={'Telefonnummer'} id={''} />
                <div>
                    <button className="btn">Skicka</button>
                </div>
            </div>
        </>
    )
}

export default SalesAssignment
