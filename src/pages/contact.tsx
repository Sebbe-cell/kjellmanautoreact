import audi from '../assets/audi46.jpg'
import FindUs from '../components/findus'
import Hero from '../components/hero'
import logo from '../assets/map.jpg'
import RoundedCardWithImage from '../components/roundedCardWithImage'

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
            <div className='contact-second-container'>
                <RoundedCardWithImage
                    logo={audi}
                    title={'Få rätt pris för din bil'}
                    description={
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum a provident ipsam asperiores autem voluptatibus cum ad, dolores sunt odio.'
                    }
                />
                <RoundedCardWithImage
                    logo={audi}
                    title={'Få dina biluppgifter verifierade'}
                    description={
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum a provident ipsam asperiores autem voluptatibus cum ad, dolores sunt odio.'
                    }
                />
                <RoundedCardWithImage
                    logo={audi}
                    title={'Få dina pengar'}
                    description={
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum a provident ipsam asperiores autem voluptatibus cum ad, dolores sunt odio.'
                    }
                />
            </div>
            <FindUs />
        </>
    )
}

export default Contact
