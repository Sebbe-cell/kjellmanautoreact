import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiBaseUrl } from '../../api/apiUrl'
import { apiEndpoints } from '../../api/endpoints'
import '../../css/addInventory.css'

enum InventoryEnum {
    header = 'header',
    make = 'make',
    model = 'model',
    color = 'color',
    plateNumber = 'plateNumber',
    milage = 'milage',
    price = 'price',
    description = 'description',
    equipment = 'equipment',
    images = 'images',
    modelYear = 'modelYear',
    gearBox = 'gearBox',
    propellent = 'propellent',
}

interface FormData {
    header: string,
    make: string
    model: string
    color: string
    plateNumber: string
    milage: number
    price: number
    description: string
    modelYear: string
    gearBox: string
    propellent: string
    equipmentIds: number[]
    images: File[]
}

const initialFormData: FormData = {
    header: '',
    make: '',
    model: '',
    color: '',
    plateNumber: '',
    milage: 0,
    price: 0,
    modelYear: '',
    gearBox: '',
    propellent: '',
    description: '',
    equipmentIds: [],
    images: [],
}

const AddInventory = (): JSX.Element => {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [equipmentList, setEquipmentList] = useState<any[]>([]) // Define the equipment list state

    useEffect(() => {
        const token = localStorage.getItem('token') // Retrieve the token from cookies or wherever it's stored

        if (token) {
            // Set up the headers with the Bearer token
            const headers = {
                Authorization: `Bearer ${token}`,
            }

            axios
                .get(apiBaseUrl + apiEndpoints.equipment, { headers }) // Pass the headers in the config
                .then((res) => {
                    setEquipmentList(res.data.data)
                })
                .catch((error) => {
                    // Handle errors here
                    console.error(error)
                })
        }
    }, []) // The empty dependency array ensures this effect runs only once when the component mounts

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleEquipmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const equipmentIds = formData.equipmentIds.includes(Number(value))
            ? formData.equipmentIds.filter((id) => id !== Number(value))
            : [...formData.equipmentIds, Number(value)]
        setFormData({ ...formData, equipmentIds })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (files) {
            const images = Array.from(files)
            setFormData({ ...formData, images })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        // Create a FormData object
        const form = new FormData()

        // Set the values of the FormData object
        form.append(InventoryEnum.header, formData.header)
        form.append(InventoryEnum.make, formData.make)
        form.append(InventoryEnum.model, formData.model)
        form.append(InventoryEnum.color, formData.color)
        form.append(InventoryEnum.plateNumber, formData.plateNumber)
        form.append(InventoryEnum.milage, String(formData.milage))
        form.append(InventoryEnum.price, String(formData.price))
        form.append('modelYear', '2023')
        form.append('gearBox', 'Automat')
        form.append('propellent', 'Diesel')
        form.append(InventoryEnum.description, formData.description)
        formData.equipmentIds.forEach((id) => {
            form.append('factIds', String(id))
        })

        // Append equipment IDs
        formData.equipmentIds.forEach((id) => {
            form.append('equipmentIds', String(id))
        })

        // Append images
        formData.images.forEach((image) => {
            form.append(InventoryEnum.images, image)
        })

        const headers = {
            Authorization: `Bearer ${token}`,
        }

        try {
            const response = await axios.post(
                `${apiBaseUrl}${apiEndpoints.inventory}`,
                form,
                {
                    headers,
                }
            )

            if (response.status === 200) {
                console.log('Inventory and images added successfully.')
                setFormData(initialFormData)
            } else {
                console.error('Error adding inventory and images.')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className=''>
            <form onSubmit={handleSubmit} className=''>
                <h2>Lägg till fordon</h2>
                <div className='add-inventory-input'>
                    <label>Rubrik:</label>
                    <input
                        type='text'
                        name={InventoryEnum.header}
                        value={formData.header}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='add-inventory-input'>
                    <label>Märke:</label>
                    <input
                        type='text'
                        name={InventoryEnum.make}
                        value={formData.make}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='add-inventory-input'>
                    <label>Modell:</label>
                    <input
                        type='text'
                        name={InventoryEnum.model}
                        value={formData.model}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='add-inventory-input'>
                    <label>Registreringsnummer:</label>
                    <input
                        type='text'
                        name={InventoryEnum.plateNumber}
                        value={formData.plateNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='add-inventory-input'>
                    <label>Miltal:</label>
                    <input
                        type='number'
                        name={InventoryEnum.milage}
                        value={formData.milage}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='add-inventory-input'>
                    <label>Färg:</label>
                    <input
                        type='text'
                        name={InventoryEnum.color}
                        value={formData.color}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='add-inventory-input'>
                    <label>Pris:</label>
                    <input
                        type='number'
                        name={InventoryEnum.price}
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='add-inventory-input'>
                    <label>Beskrivning:</label>
                    <input
                        type='text'
                        name={InventoryEnum.description}
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Utrustning:</label>
                    {equipmentList.map((equipment) => (
                        <div key={equipment.id}>
                            <input
                                type='checkbox'
                                name='equipment'
                                value={equipment.id}
                                onChange={handleEquipmentChange}
                                checked={formData.equipmentIds.includes(
                                    equipment.id
                                )}
                            />
                            <label>{equipment.name}</label>{' '}
                        </div>
                    ))}
                </div>
                {formData.images.map((image, index) => (
                    <img
                        alt='uploaded-img'
                        key={index}
                        src={URL.createObjectURL(image)}
                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                ))}
                <div>
                    <label>Bilder:</label>
                    <input
                        type='file'
                        name='images'
                        accept='image/*'
                        multiple
                        onChange={handleImageChange}
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddInventory
