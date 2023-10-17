import clsx from 'clsx'
import '../css/input.css'
import { CSSProperties } from 'react'
import { FormGroup } from './modal'

interface IFormTextAreaProps {
    label: string
    id: string
    name?: FormGroup
    value?: string | number | undefined
    optionalClass?: boolean
    optionalInputStyle?: CSSProperties | undefined
    placeholder?: string
    required?: boolean
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const FormTextArea = (props: IFormTextAreaProps): JSX.Element => {
    const {
        optionalClass,
        name,
        value,
        id,
        optionalInputStyle,
        placeholder,
        required,
        label,
        onChange,
    } = props
    return (
        <>
            <div className={clsx(optionalClass ? 'forms-optional' : 'text-area-container')}>
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="forms__textarea"
                    id={id}
                    style={optionalInputStyle}
                    autoComplete="off"
                    placeholder={placeholder}
                    required={required}
                />
                <label className='forms__label__textarea'>{label}</label>
            </div>
        </>
    )
}

export default FormTextArea
