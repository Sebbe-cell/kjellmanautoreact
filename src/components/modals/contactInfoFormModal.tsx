import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { apiBaseUrl } from '../../api/apiUrl'
import { apiEndpoints } from '../../api/endpoints'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Loader from '../loader'
import FormInput from '../formInput'
import FormTextArea from '../formTextarea'
import 'react-toastify/dist/ReactToastify.css';

interface IContactModalProps {
    headerText: string
    submittedText: string
    onClose: () => void
}

interface IContactDetails {
    errand: string
    telephone: number | undefined | string
    email: string
}

enum FormGroup {
    errand = 'errand',
    telephone = 'telephone',
    email = 'email'
}

const ContactInfoFormModal = (props: IContactModalProps): JSX.Element => {
    const { headerText, submittedText, onClose } = props

    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<{ [key in FormGroup]: boolean }>({
        errand: false,
        telephone: false,
        email: false
    })
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [initialValues, setInitialValues] = useState<IContactDetails>({
        errand: '',
        telephone: undefined,
        email: ''
    })

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target

        setInitialValues({
            ...initialValues,
            [name]: value
        })

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false
        }))
    }

    const handleValidationOnSubmit = (): boolean => {
        let hasErrors = false

        if (!initialValues.errand) {
            errors.errand = true
            hasErrors = true
        } else {
            errors.errand = false
        }

        if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                initialValues.email
            )
        ) {
            errors.email = true
            hasErrors = true
        } else {
            errors.email = false
        }

        if (!initialValues.telephone) {
            errors.telephone = true
            hasErrors = true
        } else {
            errors.telephone = false
        }

        setErrors({ ...errors })

        return !hasErrors
    }

    const onSubmit = async (): Promise<void> => {
        const isValid = handleValidationOnSubmit()
        const emailData = {
            from: `KjellmanAuto <joakim@kjellmanauto.se>`,
            to: 'joakim@kjellmanauto.se',
            subject: 'Kontaktformulär',
            text:
                'Information: ' +
                initialValues.errand +
                'Kundens email: ' +
                initialValues.email +
                'Kundens telefonnummer: ' +
                initialValues.telephone
        }
        if (isValid) {
            setLoading(true)
            try {
                await axios.post(
                    apiBaseUrl + apiEndpoints.sendEmail,
                    emailData,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                setIsSubmitted(true)
                setLoading(false)
            } catch (error: any) {
                setLoading(false)
                toast.error(
                    `Kunde inte skicka mail. Felkod: ${error.message}`,
                    {
                        position: 'bottom-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    }
                )
            }
        } else {
            setErrors({ ...errors })
        }
    }

    return (
        <>
            <div className='modal'>
                {loading && <Loader modalContainer={true} />}
                <ToastContainer />
                <div className='modal-container'>
                    <div className='modal-header'>
                        <h1>{isSubmitted ? submittedText : headerText}</h1>
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            size='xl'
                            onClick={onClose}
                        />
                    </div>
                    <div className='modal-body'>
                        {!isSubmitted ? (
                            <>
                                <FormTextArea
                                    label={'Beskriv ditt ärende*'}
                                    id={'Errand'}
                                    name={FormGroup.errand as string}
                                    value={initialValues.errand}
                                    onChange={handleInputChange}
                                    optionalInputStyle={{
                                        border: errors.errand
                                            ? '2px solid red'
                                            : '',
                                        fontSize: errors.errand ? '16px' : ''
                                    }}
                                    placeholder={
                                        errors.errand
                                            ? 'Obligatoriskt fält'
                                            : ''
                                    }
                                />
                                <FormInput
                                    label={'E-post adress*'}
                                    id={'E-post adress'}
                                    name={FormGroup.email as string}
                                    value={initialValues.email}
                                    onChange={handleInputChange}
                                    type='email'
                                    optionalInputStyle={{
                                        border: errors.email
                                            ? '2px solid red'
                                            : '',
                                        fontSize: errors.email ? '16px' : ''
                                    }}
                                    placeholder={
                                        errors.email ? 'Obligatoriskt fält' : ''
                                    }
                                />
                                <FormInput
                                    label={'Telefonnummer*'}
                                    id={'Telefonnummer'}
                                    name={FormGroup.telephone as string}
                                    value={initialValues.telephone}
                                    onChange={handleInputChange}
                                    type='number'
                                    optionalInputStyle={{
                                        border: errors.telephone
                                            ? '2px solid red'
                                            : '',
                                        fontSize: errors.telephone ? '16px' : ''
                                    }}
                                    placeholder={
                                        errors.telephone
                                            ? 'Obligatoriskt fält'
                                            : ''
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <p>
                                    Vi kommer att höra av oss till din angivna
                                    e-post adress inom kort
                                </p>
                            </>
                        )}
                    </div>
                    <div className='modal-footer'>
                        {isSubmitted ? (
                            <button
                                type='button'
                                className='modal-btn'
                                onClick={onClose}>
                                Stäng
                            </button>
                        ) : (
                            <button
                                type='submit'
                                className='modal-btn'
                                onClick={onSubmit}>
                                Skicka
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactInfoFormModal
