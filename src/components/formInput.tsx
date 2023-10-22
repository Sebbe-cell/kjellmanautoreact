import { CSSProperties } from 'react'
import { FormGroup } from './modal'
import '../css/input.css'

interface IFormInputProps {
    label: string
    id: string
    name?: FormGroup
    value?: string | number | undefined
    type?: string
    optionalInputStyle?: CSSProperties | undefined
    placeholder?: string
    required?: boolean
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
        onChange,
    } = props

    return (
        <>
            <div className="forms">
                <input
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={type ?? 'text'}
                    className="forms__input"
                    id={id}
                    style={optionalInputStyle}
                    autoComplete="off"
                    placeholder={placeholder}
                    required={required}
                />
                <label className="forms__label">{label}</label>
            </div>
        </>
    )
}

export default FormInput
