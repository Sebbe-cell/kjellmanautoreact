interface IPolicyModalProps {
    onClosePolicyWindow: () => void
}

const PolicyModal = (props: IPolicyModalProps): JSX.Element => {
    const { onClosePolicyWindow } = props

    return (
        <>
            <div className='modal'>
                <div className='modal-container'>
                    <h1>Dataskyddspolicy</h1>
                    <p style={{ marginTop: '4px' }}>
                        För att du ska känna dig trygg när du använder vår
                        tjänst, är det viktigt för oss att förklara hur vi
                        samlar in, använder och skyddar dina personuppgifter. Vi
                        värnar om din integritet och följer bestämmelserna i den
                        europeiska dataskyddsförordningen, GDPR.
                    </p>
                    <h3
                        style={{
                            color: 'rgb(211, 174, 95)',
                            marginBottom: '0'
                        }}>
                        Vilka uppgifter samlar vi in?
                    </h3>
                    <p style={{ marginTop: '4px' }}>
                        Vi samlar endast in de personuppgifter som är nödvändiga
                        för att tillhandahålla våra tjänster. Vid köp,
                        försäljning, förmedling och hantering av reklamationer
                        via vår plattform kan vi bland annat be om ditt telefonnummer,
                        e-postadress och/eller eventuella biluppgifter för att underlätta kommunikationen och
                        slutföra proccessen.
                    </p>
                    <h3
                        style={{
                            color: 'rgb(211, 174, 95)',
                            marginBottom: '0'
                        }}>
                        Hur använder vi dina uppgifter?
                    </h3>
                    <p style={{ marginTop: '4px' }}>
                        Dina personuppgifter används enbart i syfte att
                        underlätta och förbättra din upplevelse på vår
                        plattform. Vi delar inte dina uppgifter med tredje
                        parter utan ditt uttryckliga samtycke.
                    </p>
                    <h3
                        style={{
                            color: 'rgb(211, 174, 95)',
                            marginBottom: '0'
                        }}>
                        Säkerhet och skydd
                    </h3>
                    <p style={{ marginTop: '4px' }}>
                        Vi vidtar tekniska och organisatoriska åtgärder för att
                        skydda dina personuppgifter från obehörig åtkomst,
                        förlust eller manipulation. Vår plattform använder säkra
                        metoder för dataöverföring och lagring.
                    </p>
                    <h3
                        style={{
                            color: 'rgb(211, 174, 95)',
                            marginBottom: '0'
                        }}>
                        Samtycke
                    </h3>
                    <p style={{ marginTop: '4px' }}>
                        Innan vi samlar in dina personuppgifter kommer vi att be
                        om ditt tydliga samtycke. Du har rätt att när som helst
                        återkalla ditt samtycke genom att kontakta oss.
                    </p>
                    <h3
                        style={{
                            color: 'rgb(211, 174, 95)',
                            marginBottom: '0'
                        }}>
                        Dina rättigheter
                    </h3>
                    <p style={{ marginTop: '4px' }}>
                        Enligt GDPR har du rätt att begära tillgång till,
                        rättelse av, och radering av dina personuppgifter. Du
                        har också rätt att invända mot behandlingen av dina
                        uppgifter samt att överföra dem till en annan
                        tjänsteleverantör.
                    </p>
                    <h3
                        style={{
                            color: 'rgb(211, 174, 95)',
                            marginBottom: '0'
                        }}>
                        Kontaktinformation
                    </h3>
                    <p style={{ marginTop: '4px' }}>
                        Om du har frågor eller funderingar om vår
                        dataskyddspolicy eller hur vi hanterar dina
                        personuppgifter, är du välkommen att kontakta oss på
                        info@kjellmanauto.se.
                    </p>
                    <p>
                        Genom att använda vår tjänst samtycker du till denna
                        dataskyddspolicy. Vi förbehåller oss rätten att
                        uppdatera och ändra denna policy, och eventuella
                        ändringar kommer att meddelas på denna sida.
                    </p>
                    <div className='modal-footer'>
                        <button onClick={onClosePolicyWindow} className='modal-btn'>
                            Stäng
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PolicyModal
