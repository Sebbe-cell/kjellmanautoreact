import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import herologo from '../assets/beachbig.jpg'
import Hero from '../components/hero'

const SalesAssignment = (): JSX.Element => {
    const mounted = useRef(false)

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
        } else {
            startAnimations()
        }
    })

    const firstVariants = {
        hidden: {
            opacity: 0,
            x: -300,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
            },
        },
    }

    const secondVariants = {
        hidden: {
            opacity: 0,
            x: 300,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
            },
        },
    }

    const thirdVariants = {
        hidden: {
            opacity: 0,
            x: -300,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
            },
        },
    }

    const firstControls = useAnimation()
    const secondControls = useAnimation()
    const thirdControls = useAnimation()

    const startAnimations = () => {
        firstControls.start('visible')
        secondControls.start('visible')
        thirdControls.start('visible')
    }

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
                    <motion.h1
                        initial="hidden"
                        animate={firstControls}
                        variants={firstVariants}
                    >
                        Försäljningsuppdrag
                    </motion.h1>
                    <motion.div
                        initial="hidden"
                        animate={secondControls}
                        variants={secondVariants}
                    >
                        <h3>
                            Vill du göra dig av med din bil på ett smidigt sätt
                            och samtidigt få det bästa möjliga priset? Då har vi
                            den perfekta lösningen för dig - vårt säljuppdrag.
                            Att sälja sin bil själv kan vara både tidskrävande
                            och krångligt, men med vår hjälp slipper du dessa
                            bekymmer.
                        </h3>
                        <h3>
                            Vi har en bred kundkrets för bilförsäljning och ett
                            omfattande nätverk. När du väljer att sälja din bil
                            genom oss, tar vi hand om allt. Vi granskar noggrant
                            bilens fysiska skick och dokumentation, och sedan
                            marknadsför vi den på samma exklusiva sätt som vi
                            gör med våra egna bilar.
                        </h3>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate={thirdControls}
                        variants={thirdVariants}
                    >
                        <h3>
                            Det enda du behöver göra är att fylla i dina
                            kontaktuppgifter i formuläret nedan. Inom 48 timmar
                            kommer den ansvariga personen att höra av sig till
                            dig med en närmare värdering av din bil, presentera
                            ett förslag och beskriva hur hela processen kommer
                            att gå till.
                        </h3>
                        <h3>
                            Om du föredrar att prata direkt med oss, kan du
                            ringa oss på telefonnummer: 00000000000. Vi ser fram
                            emot att hjälpa dig att få det bästa priset för din
                            bil!
                        </h3>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default SalesAssignment
