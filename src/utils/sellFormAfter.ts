export interface ISellFormInfoAfter {
    title: string
    description: string
}

const sellFormInfoAfter: ISellFormInfoAfter[] = [
    {
        title: 'Granskning av din information:',
        description:
            'Vårt team kommer noggrant granska den information du har skickat in om din bil. Det inkluderar märke, modell, årsmodell, körsträcka och skick. Detta hjälper oss att fastställa ett rättvist och konkurrenskraftigt bud för din bil.',
    },
    {
        title: 'Uppskattning av värdet:',
        description:
            'Våra experter kommer att använda den tillhandahållna informationen tillsammans med marknadsdata och andra faktorer för att fastställa ett bud som återspeglar din bils verkliga värde. Vi strävar alltid efter att ge dig det bästa möjliga erbjudandet.',
    },
    {
        title: 'Kontakt med dig:',
        description:
            'Efter att vi har fastställt ett bud som vi tror är rimligt, kommer vi att kontakta dig för att diskutera erbjudandet. Vi kan svara på eventuella frågor eller funderingar du har och vi är öppna för att förhandla om priset om det behövs.',
    },
    {
        title: 'Bilinspektion:',
        description:
            'Om du accepterar vårt erbjudande, kommer vi att arrangera en tid för att inspektera din bil. Detta görs för att säkerställa att bilen är i det skick du har beskrivit den och för att slutföra försäljningsprocessen.',
    },
    {
        title: 'Slutförande av försäljning:',
        description:
            'När bilinspektionen är klar och allt är i ordning, hjälper vi dig att slutföra försäljningen. Vi tar hand om all den administrativa och juridiska hanteringen, så att du kan slappna av och fokusera på det som är viktigast för dig.',
    },
]

export { sellFormInfoAfter }