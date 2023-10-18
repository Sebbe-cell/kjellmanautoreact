import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import herologo from '../assets/beachbig.jpg'
import FormInput from '../components/formInput'
import FormTextArea from '../components/formTextarea'
import Hero from '../components/hero'
import { faArrowDown, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'

const SalesAssignment = (): JSX.Element => {
    return (
        <>
            <Hero imgSrc={herologo} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'start',
                }}
            >
                <div style={{ maxWidth: '80rem', padding: '2rem' }}>
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
                            <span style={{ color: 'rgb(211, 174, 95)' }}>
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
                                style={{ color: 'rgb(211, 174, 95)' }}
                                href="tel:+46 (0)8-400 687 86"
                            >
                                +46 (0)8-400 687 86
                            </a>
                        </p>
                        <p>
                            Vi ser fram emot att hjälpa dig att få det bästa
                            priset för din bil!
                        </p>
                        <div
                            style={{
                                border: '2px solid rgb(211, 174, 95)',
                                marginTop: '2rem',
                            }}
                        ></div>
                    </div>
                </div>
                <div className="sales-assignment-form-container">
                    <FormInput label={'Märke'} id={''} optionalClass={true} />
                    <FormInput label={'Modell'} id={''} optionalClass={true} />
                    <FormInput label={'Miltal'} id={''} optionalClass={true} />
                    <FormInput
                        label={'Önskat pris'}
                        id={''}
                        optionalClass={true}
                    />
                    <FormTextArea
                        label={'Övrig info / Eventuella brister'}
                        id={''}
                    />
                    <FormInput
                        label={'E-post adress'}
                        id={''}
                        optionalClass={true}
                    />
                    <FormInput
                        label={'Telefonnummer'}
                        id={''}
                        optionalClass={true}
                    />
                    <button className="btn">Skicka</button>
                </div>

                {/* <div style={{ width: '30%' }}>
                    <div className="select-container">
                        <select className="forms__select">
                            <option className='forms__select__option'>test 1</option>
                            <option className='forms__select__option'>test 2</option>
                            <option className='forms__select__option'>test 3</option>
                        </select>
                        <div className='forms__select__icon'>
                            <FontAwesomeIcon icon={faCircleChevronDown} size="1x"/>
                        </div>
                        <label className="forms__label__select">test</label>
                    </div>
                </div> */}

            </div>
        </>
    )
}

export default SalesAssignment
