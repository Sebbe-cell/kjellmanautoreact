import FindUs from '../components/findus'
import Hero from '../components/hero'
import logo from '../assets/map.jpg'
import '../css/modal.css'

const Contact = (): JSX.Element => {
    return (
        <>
            <Hero imgSrc={logo} />
            <div className='contact-container'>
                <div className='contact-text-container'>
                    <div>
                        <h1>Öppettider</h1>
                        <p>Måndag - Fredag: 11.00 - 18.00</p>
                        <p>Lördag: 12.00 - 15.00</p>
                        <p>Söndag: Stängt</p>
                    </div>
                    <div>
                        <h1>Kontakt</h1>
                        <p>Address: Teknikervägen 1, 149 45 Nynäshamn</p>
                        <p>
                            Telefonnummer:{' '}
                            <a href='tel:+46 (0)8-400 687 86'>
                                +46 (0)8-400 687 86
                            </a>
                        </p>
                        <p>Maila oss: <a href='mailto:info@kjellmanauto.se'>info@kjellmanauto.se</a></p>
                    </div>
                </div>
            </div>
            <FindUs />
        </>
    )
}

export default Contact
