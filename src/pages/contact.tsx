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
                        <p style={{ margin: '0' }}>Måndag - Fredag:</p>
                        <p style={{ margin: '0' }}>11.00 - 18.00</p>
                        <p style={{ margin: '18px 0 0 0' }}>Lördag:</p>
                        <p style={{ margin: '0' }}>12.00 - 15.00</p>
                        <p style={{ margin: '18px 0 0 0' }}>Söndag:</p>
                        <p style={{ margin: '0' }}>Stängt</p>
                    </div>
                    <div>
                        <h1>Kontakt</h1>
                        <p style={{ margin: '0' }}>Address:</p>
                        <p style={{ margin: '0' }}>
                            Teknikervägen 1, 149 45 Nynäshamn
                        </p>
                        <p style={{ margin: '18px 0 0 0' }}>Telefonnummer: </p>
                        <p style={{ margin: '0' }}>
                            <a href='tel:+46 (0)8-400 687 86'>
                                +46 (0)8-400 687 86
                            </a>
                        </p>
                        <p style={{ margin: '18px 0 0 0' }}>Maila oss:</p>
                        <p style={{ margin: '0' }}>
                            <a href='mailto:info@kjellmanauto.se'>
                                info@kjellmanauto.se
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <FindUs />
        </>
    )
}

export default Contact
