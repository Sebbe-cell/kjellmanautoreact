import Hero from '../components/hero'
import herologo from '../assets/aboutus.jpg'

const AboutUs = (): JSX.Element => {
    return (
        <>
            <Hero imgSrc={herologo} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div style={{ maxWidth: '80rem', padding: '2rem' }}>
                    <h1>
                        Välkommen till Kjellman Auto - Din Partner för Begagnade
                        Bilar!
                    </h1>
                    <h2>
                        Vi är din pålitliga partner för begagnade bilar i
                        Nynäshamn och södra Stockholm. Med över åtta år i
                        branschen har vi dedikerat oss till att leverera
                        högkvalitativa begagnade bilar till våra kunder.
                    </h2>
                    <h2>
                        Vår resa började 2015, och sedan dess har vi byggt ett
                        starkt rykte för pålitlighet, professionalism och
                        ärlighet i vårt arbete. Vår vision är att erbjuda
                        högkvalitativa begagnade bilar och att göra
                        köpupplevelsen så smidig och trygg som möjligt för våra
                        kunder.
                    </h2>
                    <h3>Varför välja oss:</h3>
                    <ul>
                        <li>
                            Erfarenhet: Med åtta års erfarenhet inom branschen
                            har vi en djup förståelse för begagnade bilar och
                            kan erbjuda expertrådgivning.
                        </li>
                        <li>
                            Kvalitet: Vi noggrant väljer och granskar varje
                            begagnad bil i vår inventering för att säkerställa
                            högsta kvalitet och pålitlighet.
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
                    <h3>Våra tjänster inkluderar:</h3>
                    <ul>
                        <li>
                            Försäljning av Begagnade Bilar: Utforska vårt brett
                            utbud av begagnade bilar och hitta den perfekta
                            matchningen för dina behov.
                        </li>
                        <li>
                            Förmedlingstjänst: Låt oss hjälpa dig att sälja din
                            begagnade bil snabbt och effektivt.
                        </li>
                        <li>
                            Högkvalitativ Kundservice: Vår vänliga och kunniga
                            personal är alltid redo att hjälpa dig med dina
                            frågor och behov.
                        </li>
                    </ul>
                    <h3>
                        Vi är stolta över att ha varit en del av ditt förtroende
                        under åren och ser fram emot att fortsätta att erbjuda
                        högkvalitativa begagnade bilar och förstklassig service
                        i många år framöver. Kontakta oss idag för att lära dig
                        mer eller besöka vår utställningslokal i Nynäshamn.
                    </h3>
                    <h3>
                        Tack för att du väljer Kjellman Auto - Din Partner för
                        Begagnade Bilar!
                    </h3>
                </div>
            </div>
        </>
    )
}

export default AboutUs