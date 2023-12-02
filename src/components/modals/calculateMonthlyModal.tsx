import { useEffect, useState } from 'react'
import '../../css/modal.css'

interface ICalculateMonthly {
    onClose: () => void
    carData: any
}

const CalculateMonthlyModal = (props: ICalculateMonthly): JSX.Element => {
    const { onClose, carData } = props

    const [months, setMonths] = useState<number>(24)
    const [deposit, setDeposit] = useState<string>('')

    useEffect(() => {
        const initialDeposit = 0.3 * parseFloat(carData.price[0].$.value)
        setDeposit(initialDeposit.toString())
    }, [carData.price])

    const handleChangeMonths = (e: any): void => {
        setMonths(Number(e.target.value))
    }

    const handleChangeDeposit = (e: any): void => {
        setDeposit(e.target.value)
    }

    const interestRate = 0.0795
    const carPrice = parseFloat(carData.price[0].$.value)
    const minDeposit = 0.2 * carPrice
    const maxDeposit = 0.8 * carPrice

    const calculateMonthlyPrice = (): string => {
        const convertedDeposit = deposit.replace(/\./g, '')
        if (months === 0) {
            return 'Välj antal månader'
        }

        // Calculate the loan amount after deducting the deposit
        const loanAmount = carPrice - Number(convertedDeposit)

        const monthlyInterestRate = interestRate / 12
        const numerator =
            loanAmount *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, months)
        const denominator = Math.pow(1 + monthlyInterestRate, months) - 1
        const monthlyPayment = numerator / denominator

        return `${monthlyPayment
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} kr/månad`
    }

    return (
        <div className='modal'>
            <div className='modal-container'>
                <div className='modal-header__monthly'>
                    <div>
                        <h1>Räkna ut din månadskostnad här</h1>
                    </div>
                    <div className='modal-header__monthly_info'>
                        <p>Bilen pris: {carData.price[0].$.value} kr</p>
                        <p>Ränta: 7.95%</p>
                    </div>
                </div>
                <div style={{ width: '100%' }} className='modal-body'>
                    <div className='calculate-container'>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'start',
                                flexDirection: 'column',
                                width: '100%'
                            }}>
                            <div>
                                <span>{`Lånetid (${months} månader)`}</span>
                            </div>
                            <div style={{ width: '100%' }}>
                                <input
                                    style={{ width: '100%' }}
                                    type='range'
                                    min='12'
                                    max='84'
                                    value={months}
                                    onChange={(e) => handleChangeMonths(e)}
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'start',
                                flexDirection: 'column',
                                width: '100%'
                            }}>
                            <div>
                                <span>{`Kontantinsats (${deposit} kr)`}</span>
                            </div>
                            <div style={{ width: '100%' }}>
                                <input
                                    style={{ width: '100%' }}
                                    type='range'
                                    min={minDeposit}
                                    max={maxDeposit}
                                    value={deposit}
                                    onChange={(e) => handleChangeDeposit(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1
                            style={{
                                fontSize: '28px',
                                textAlign: 'center',
                                marginBottom: '3rem'
                            }}>{`Din månadskostnad: ${calculateMonthlyPrice()}*`}</h1>
                        <div className='divider'></div>
                        <p style={{ fontSize: '14px' }}>
                            *Alla priser är inkl moms
                            <br />
                            Uppläggningsavg. samt aviavgift tillkommer.
                        </p>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button
                        type='button'
                        className='modal-btn'
                        onClick={onClose}>
                        Stäng
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CalculateMonthlyModal
