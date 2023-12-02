import Hero from '../components/hero'
import herologo from '../assets/aboutus.jpg'
import '../css/modal.css'

const AboutUs = (): JSX.Element => {
    return (
        <>
            <Hero imgSrc={herologo} />
            <div className="text-container">
                <div>
                    <h1>
                        Välkommen till Kjellman Auto - Din Partner för Begagnade
                        Bilar!
                    </h1>
                    <h2>
                        Vi är din pålitliga partner för begagnade bilar i
                        Nynäshamn och hela Sverige. Med över åtta år i branschen
                        har vi dedikerat oss till att leverera högkvalitativa
                        begagnade bilar till våra kunder.
                    </h2>
                    <h3>
                        Vår resa började 2015, och sedan dess har vi byggt ett
                        starkt rykte för pålitlighet, professionalism och
                        ärlighet i vårt arbete. Vår vision är att erbjuda
                        högkvalitativa begagnade bilar och att göra
                        köpupplevelsen så smidig och trygg som möjligt för våra
                        kunder.
                    </h3>
                    <h3 style={{ color: 'rgb(211, 174, 95)' }}>
                        Varför välja oss:
                    </h3>
                    <ul>
                        <li>
                            Erfarenhet: Med åtta års erfarenhet inom branschen
                            har vi en djup förståelse för begagnade bilar och
                            kan erbjuda expertrådgivning.
                        </li>
                        <li>
                            Kvalitet: Vi granskar varje begagnad bil i vår
                            inventering för att säkerställa högsta kvalitet och
                            pålitlighet.
                        </li>
                        <li>
                            Personlig service: Vår dedikerade personal är här
                            för att svara på dina frågor och guida dig genom
                            hela köpprocessen.
                        </li>
                        <li>
                            Lokal närvaro: Beläget i Nynäshamn, söder om
                            Stockholm, är vi stolta över att vara en del av det
                            lokala samhället.
                        </li>
                    </ul>
                    <h3 style={{ color: 'rgb(211, 174, 95)' }}>
                        Våra tjänster inkluderar:
                    </h3>
                    <ul>
                        <li>
                            Försäljning av begagnade bilar: Utforska vårt utbud
                            av begagnade bilar och hitta den perfekta
                            matchningen för dina behov.
                        </li>
                        <li>
                            Förmedlingstjänst: Låt oss hjälpa dig att sälja din
                            begagnade bil snabbt och effektivt.
                        </li>
                        <li>
                            Högkvalitativ kundservice: Vår vänliga och kunniga
                            personal är alltid redo att hjälpa dig med dina
                            frågor och behov.
                        </li>
                    </ul>
                    <h3>
                        Vi är stolta över att ha varit en del av ditt förtroende
                        under åren och ser fram emot att fortsätta att erbjuda
                        högkvalitativa begagnade bilar och förstklassig service
                        i många år framöver. Kontakta oss idag för att lära dig
                        mer eller besöka vår anläggning i Nynäshamn.
                    </h3>
                    <h2>
                        Tack för att du väljer Kjellman Auto - Din Partner för
                        Begagnade Bilar!
                    </h2>
                </div>
            </div>
        </>
    )
}

export default AboutUs
