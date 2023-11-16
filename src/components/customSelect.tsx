import { useState } from 'react'
import clsx from 'clsx'

import {
    faChevronCircleDown,
    faChevronCircleUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CustomSelect = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<string>(
        'Välj ett alternativ'
    )

    const options = [
        { option: 'Value 1' },
        { option: 'Value 2' },
        { option: 'Value 3' },
        { option: 'Value 1' },
        { option: 'Value 2' },
        { option: 'Value 3' },
        { option: 'Value 1' },
        { option: 'Value 2' },
        { option: 'Value 3' },
        { option: 'Value 1' },
        { option: 'Value 2' },
        { option: 'Value 3' },
        { option: 'Value 1' },
        { option: 'Value 2' },
        { option: 'Value 3' },
    ]

    const handleOnClick = (): void => {
        setIsOpen(!isOpen)
    }

    const handleOptionClick = (optionValue: string): void => {
        setSelectedOption(optionValue)
        setIsOpen(false)
    }

    return (
        <div className="select-container">
            <div className="select-label">Test</div>
            <div className="select-icon">
                <FontAwesomeIcon
                    icon={isOpen ? faChevronCircleUp : faChevronCircleDown}
                />
            </div>
            <div
                className={clsx(
                    isOpen ? 'select-header-toggled' : 'select-header'
                )}
                onClick={handleOnClick}
            >
                <p>{selectedOption}</p>
            </div>
            {isOpen && (
                <div className="select-options">
                    {options.map((option: any, index: number) => (
                        <div
                            className="select-items"
                            onClick={() => handleOptionClick(option.option)}
                        >
                            <p key={index}>{option.option}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CustomSelect
