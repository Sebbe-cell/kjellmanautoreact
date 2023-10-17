import FindUs from '../components/findus'
import Hero from '../components/hero'
import logo from '../assets/map.jpg'


const Contact = (): JSX.Element => {
    return (
        <>
            <Hero imgSrc={logo} />
            <div className="contact-container">
                <div className="contact-text-container">
                    <div>
                        <h1>Öppettider</h1>
                        <p>Måndag - Fredag: 10 - 19</p>
                        <p>Lördagar: 10 - 15</p>
                        <p>Söndagar: Endast bokning</p>
                    </div>
                    <div>
                        <h1>Kontakt</h1>
                        <p>Address: Nynäshamn</p>
                        <p>Telefonnummer: 08-123 45 67</p>
                        <p>Maila oss: info@kjellmanauto.se</p>
                    </div>
                </div>
            </div>
            <FindUs />
        </>
    )
}

export default Contact
