import React from 'react'
import { Link } from 'react-router-dom'

import { routePaths } from '../utils/routePaths'
import { IAlteredVehicleData } from '../utils/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Loader from './loader'
import '../css/inventorySlider.css'

interface IInventorySliderProps {
    loading: boolean
    error: boolean
    data: any
}

const InventorySlider = (props: IInventorySliderProps): JSX.Element => {
    const { loading, error, data } = props

    const renderCommonInfo = (d: IAlteredVehicleData): JSX.Element => {
        return (
            <>
                <div className="inventory-description">
                    <span>{d.modelyear}</span>
                </div>
                <div className="inventory-description">
                    <span>|</span>
                </div>
                <div className="inventory-description">
                    <span>{d.miles[0]._}</span>
                </div>
                <div className="inventory-description">
                    <span>|</span>
                </div>
                <div className="inventory-description">
                    <span>{d.gearbox ?? 'n/a'}</span>
                </div>
                <div className="inventory-description">
                    <span>|</span>
                </div>
                <div className="inventory-description">
                    <span>{d.primaryfuel}</span>
                </div>
            </>
        )
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {!error && (
                        <>
                            <div className="slider-header">
                                <h1>
                                    <Link to={routePaths.inventory}>
                                        Utforska hela lagret
                                    </Link>{' '}
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        size="xs"
                                    />
                                </h1>
                            </div>
                            <div className="slider-wrapper">
                                <div className="slider-container">
                                    {data.map((d: IAlteredVehicleData) => (
                                        <React.Fragment key={d.$.id}>
                                            <Link
                                                to={`${routePaths.inventory}/${d.$.id}`}
                                            >
                                                <div className="slides">
                                                    <img
                                                        src={
                                                            d.image?.[0]
                                                                ?.main[0]
                                                        }
                                                        alt={'preview'}
                                                    />
                                                    <p
                                                        style={{
                                                            marginBottom:
                                                                '0.2rem',
                                                        }}
                                                    >
                                                        {d.headline}
                                                    </p>
                                                    <div className="inventory-facts-container">
                                                        {renderCommonInfo(d)}
                                                    </div>
                                                    <h4>{d.price[0]._}</h4>
                                                </div>
                                            </Link>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div
                                    className="slider-container"
                                    style={{ marginLeft: '1rem' }}
                                >
                                    {data.map((d: IAlteredVehicleData) => (
                                        <React.Fragment key={d.$.id}>
                                            <Link
                                                to={`${routePaths.inventory}/${d.$.id}`}
                                            >
                                                <div className="slides">
                                                    <img
                                                        src={
                                                            d.image?.[0]
                                                                ?.main[0]
                                                        }
                                                        alt={'preview'}
                                                    />
                                                    <h4>{d.headline}</h4>
                                                    <div className="inventory-facts-container">
                                                        {renderCommonInfo(d)}
                                                    </div>
                                                    <h4>{d.price[0]._}</h4>
                                                </div>
                                            </Link>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default InventorySlider
