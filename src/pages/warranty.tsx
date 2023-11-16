import { useEffect, useState } from 'react'

import herologo from '../assets/kamrem.jpg'
import Hero from '../components/hero'
import WarrantyModal from '../components/modals/warrantyModal'
import '../css/modal.css'

const Warranty = (): JSX.Element => {
    const [openModal, setOpenModal] = useState<boolean>(false)

    useEffect(() => {
        if (openModal) {
            document.body.classList.add('disable-background-scroll')
        } else {
            document.body.classList.remove('disable-background-scroll')
        }

        return () => {
            document.body.classList.remove('disable-background-scroll')
        }
    }, [openModal])

    const handleOpenModal = (): void => {
        setOpenModal(true)
        document.body.classList.add('disable-background-scroll')
    }

    const handleCloseModal = (): void => {
        setOpenModal(false)
        document.body.classList.remove('disable-background-scroll')
    }

    return (
        <>
            <Hero imgSrc={herologo} />
            <div className='text-container'>
                <div>
                    <h1>Garantivillkor</h1>
                    <div>
                        <h2>
                            Vi på Kjellman Auto är fast beslutna att ge dig
                            bästa möjliga service och stöd. Nedan finner du våra
                            garantivillkor som säkerställer din trygghet som
                            kund:
                        </h2>
                    </div>
                    <div>
                        <h3>1. Garantiansvar</h3>
                        <p>
                            Om du upptäcker ett fel vid leveransen av din bil
                            eller om det uppstår något inom den angivna
                            garantitiden/körsträckan, så är du täckt av Kjellman
                            Auto's garantiansvar. Vi åtar oss att åtgärda felet
                            kostnadsfritt hos den verkstad som vi har anvisat.
                            Detta ska utföras utan att det medför väsentlig
                            olägenhet för dig som kund och inom rimlig tid,
                            normalt sett inom två veckor från det att du har
                            meddelat oss om felet. Vid bedömningen av vad som
                            anses vara rimlig tid och väsentlig olägenhet,
                            kommer vi ta hänsyn till ditt behov av bilen, felets
                            omfattning och art, svårigheten att identifiera
                            felet samt tidpunkten när du har ställt bilen till
                            vårt förfogande. Om vi tillhandahåller en lånebil
                            ska detta också beaktas vid bedömningen av rimlig
                            tid för åtgärdande.
                        </p>
                        <h3>2. Alternativ vid uteblivet avhjälpande</h3>
                        <p>
                            Om avhjälpande inte utförs enligt punkt ett, har du
                            som kund rätt att vidta följande åtgärder: *Gör
                            avdrag på köpeskillingen med det belopp som
                            motsvarar felets värde. *Kräva skälig ersättning för
                            att avhjälpa felet. *Häva köpet om minst tre försök
                            till avhjälpande har misslyckats och felet är av
                            väsentlig betydelse för dig. Vid hävning ska du
                            återlämna bilen, och Kjellman Auto återbetalar
                            köpeskillingen. Den återlämnade bilen ska vara i
                            normalt skick, förutom det fel som har lett till
                            hävning samt vanligt slitage. Kjellman Auto har rätt
                            att få ersättning för nyttan du har haft av bilen,
                            inklusive värdeminskning. Efter avräkning ska du få
                            åtminstone det belopp som gör att du kan köpa en
                            felfri bil som, vad gäller standard och skick,
                            motsvarar den bil du returnerade vid
                            hävningstillfället.
                        </p>
                        <h3>3. Skydd enligt konsumentköplagen</h3>
                        <p>
                            Det är viktigt att notera att innehållet i denna
                            garanti inte begränsar dina rättigheter enligt
                            konsumentköplagen. Enligt lagen ansvarar
                            säljföretaget för fel som fanns vid leveransen. Om
                            fel upptäcks inom sex månader anses det normalt ha
                            funnits vid leveransen, om inte säljföretaget kan
                            bevisa annat eller om detta är oförenligt med varans
                            eller felets natur. Om fel upptäcks mer än sex
                            månader efter leveransen måste du som kund göra det
                            sannolikt att felet fanns vid leveransen. Du kan
                            alltid reklamera ett fel inom tre år efter
                            leveransen om det sker inom två månader från
                            upptäckten. Detta innebär att konsumentköplagen kan
                            ge dig ett skydd som inte påverkas av denna
                            garantivillkor. Vi strävar alltid efter att ge dig
                            den bästa möjliga servicen och rättvisa villkor för
                            ditt bilköp. Tveka inte att kontakta oss om du har
                            några frågor eller behöver stöd. Vi finns här för
                            att hjälpa dig.
                        </p>
                    </div>

                    <div className='divider-2'></div>

                    <div className='fault-report-container'>
                        <div>
                            <h1>Reklamation</h1>
                            <p>
                                För att hjälpa oss att hantera din reklamation
                                på bästa sätt, vänligen fyll i formuläret nedan.
                                Vi är dedikerade till att lösa eventuella
                                problem och säkerställa din fullständiga nöjdhet
                                med din bilaffär. När din reklamation har blivit
                                genomgången kommer vi att återkomma inom en
                                rimlig tidsram.
                            </p>
                            <button
                                className='modal-btn'
                                onClick={handleOpenModal}>
                                Öppna formuläret
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {openModal && (
                <WarrantyModal
                    headerText='Fyll i formuläret'
                    submittedText='Tack!'
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}

export default Warranty
