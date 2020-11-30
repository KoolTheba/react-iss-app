import React, { useState } from 'react'

import { getPassTimes } from '../../utils/store'

// hooks
import useForm from '../../hooks/useForm'

// utils
import validate from '../../utils/formValidationRules'

// Material UI components
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

// components
import TimesTable from '../TimesTable/TimesTable'
import Map from '../Map/Map'

// styles
import './PassTimes.css'

export default function PassTimes () {

    const [coordsData, setCoordsData] = useState({
        lat: 0,
        lon: 0,
        views: []
    })
    const [hasError, setErrors] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)
        setCoordsData({
            lat: 0,
            lon: 0,
            views: []
        })
        try {
            const data = await getPassTimes(values.latitude, values.longitude)
            setCoordsData({
                lat: values.latitude, 
                lon: values.longitude,
                views: data.response
            })
            setIsLoading(false)
            setErrors(false)
        } catch (error) {
            setErrors(true)
        }
    }

    const { 
        values,
        errors,
        handleChange,
        handleSubmit
      } = useForm(fetchData, validate)


    return (
        <>
        <div className='passtimes-main'>
        <h1>When can I see the ISS from my location? <span role='img' aria-label="image">🌍</span></h1>
        <h3>Please enter your latitude and longitude</h3>
        <form
            onSubmit={handleSubmit}
            className={'latlong-form'}
            autoComplete="off">
            <div>
                <TextField
                    required
                    id="lat"
                    label="Latitude"
                    helperText="*Lat refs must be between [-90/+90]"
                    variant="outlined"
                    placeholder="Latitude"
                    type="text"
                    name="latitude"
                    onChange={handleChange}
                    value={values.latitude || ''}
                />
                {errors.latitude && (
                    <Alert severity="error">{errors.latitude}</Alert>
                )}
                <TextField
                    required
                    id="long"
                    label="Longitude"
                    helperText="*Long refs must be between [-180/+180]"
                    variant="outlined"
                    placeholder="Longitude"
                    type="text"
                    name="longitude"
                    onChange={handleChange}
                    value={values.longitude || ''}
                />
                {errors.longitude && (
                    <Alert severity="error">{errors.longitude}</Alert>
                )}
            </div>
            <Button
                variant="contained"
                type="submit"
                color={isSubmitted ? 'secondary' : 'primary'}
                onClick={() => setIsSubmitted(!isSubmitted)}
            >Check
            </Button>
        </form>
            {isLoading && !hasError 
                ? <><CircularProgress /></> 
                : null
            }
            {hasError ? <Alert severity="error">Something went wrong...clear and try again</Alert> : null}
            {isSubmitted && !isLoading && coordsData.views.length > 0
                ?   <div className='map-area'>
                        <p>The ISS is visible for you {coordsData.views.length} times!</p>
                        <TimesTable timesInfo={coordsData.views}/>
                        <Map 
                            className='map-container'
                            lat={coordsData.lat}
                            lon={coordsData.lon}
                        />
                    </div>
                : null
            }
        </div>
        </>
    );
}