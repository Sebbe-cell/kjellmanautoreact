import { useState } from 'react'
import clsx from 'clsx'

import {
    faCheck,
    faChevronCircleDown,
    faChevronCircleUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CustomMultiDropdownSelect = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])

    const options = [
        { option: 'Value 1' },
        { option: 'Value 2' },
        { option: 'Value 3' },
        // ... Add more options
    ]

    const handleOnClick = (): void => {
        setIsOpen(!isOpen)
    }

    const handleOptionClick = (optionValue: string): void => {
        if (selectedOptions.includes(optionValue)) {
            setSelectedOptions(
                selectedOptions.filter((value) => value !== optionValue)
            )
        } else {
            setSelectedOptions([...selectedOptions, optionValue])
        }
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
                <p>
                    {selectedOptions.length === 0
                        ? 'Select an option'
                        : selectedOptions.join(', ')}
                </p>
            </div>
            {isOpen && (
                <div className="select-options">
                    {options.map((option: any, index: number) => (
                        <div className="select-items" key={index} onClick={() => handleOptionClick(option.option)}>
                            {selectedOptions.includes(option.option) && (
                                <FontAwesomeIcon icon={faCheck} />
                            )}
                            <p>
                                {option.option}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CustomMultiDropdownSelect
