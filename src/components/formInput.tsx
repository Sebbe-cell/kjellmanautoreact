import { CSSProperties } from 'react'
import '../css/input.css'

interface IFormInputProps {
    label: string
    id: string
    name?: string
    max?: string
    value?: string | number | undefined
    type?: string
    optionalText?: string
    optionalInputStyle?: CSSProperties | undefined
    placeholder?: string
    required?: boolean
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
}

const FormInput = (props: IFormInputProps): JSX.Element => {
    const {
        label,
        id,
        name,
        value,
        type,
        optionalInputStyle,
        placeholder,
        required,
        optionalText,
        max,
        onKeyDown,
        onChange
    } = props

    return (
        <>
            <div className='forms'>
                <input
                    name={name}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    type={type ?? 'text'}
                    className='forms__input'
                    id={id}
                    style={optionalInputStyle}
                    autoComplete='off'
                    placeholder={placeholder}
                    max={max}
                    required={required}
                />
                {optionalText && (
                    <div className='forms__text'>
                        <p>{optionalText}</p>
                    </div>
                )}
                <label className='forms__label'>{label}</label>
            </div>
        </>
    )
}

export default FormInput
