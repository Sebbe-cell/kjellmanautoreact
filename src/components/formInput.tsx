import clsx from 'clsx'
import '../css/input.css'
import { FormGroup } from './modal'
import { CSSProperties } from 'react'

interface IFormInputProps {
    label: string
    id: string
    name?: FormGroup
    value?: string | number | undefined
    type?: string
    optionalClass?: boolean
    optionalInputStyle?: CSSProperties | undefined
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
}

const FormInput = (props: IFormInputProps): JSX.Element => {
    const { label, id, name, value, type, optionalClass, optionalInputStyle, onChange } = props

    return (
        <>
            <div className={clsx(optionalClass ? "forms-optional" : "forms")}>
                <input
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={type ?? "text"}
                    className="forms__input"
                    id={id}
                    style={optionalInputStyle}
                    autoComplete='off'
                />
                <label className="forms__label">{label}</label>
            </div>
        </>
    )
}

export default FormInput
