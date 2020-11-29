import React, { useState } from 'react'

import { getPassTimes } from '../../utils/store'
// import validator from '../../utils/validator'

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

    const [lat, setLat] = useState()
    const [lon, setLon] = useState()
    // const [isValidLat, setValidLat] = useState(false)
    // const [isValidLon, setValidLon] = useState(false)
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
        try {
            const data = await getPassTimes(lat, lon)
            console.log('DATA', data)
            setCoordsData({
                lat, 
                lon,
                views: data.response
            })
            setIsLoading(false)
            setLat('')
            setLon('')
            setErrors(false)
            // setIsSubmitted(false)
        } catch (error) {
            setErrors(true)
        }
    }

    const handleInputChange = (e) => {
        let { name, value } = e.target
        e.persist()
    
        if(name === 'lat') setLat(value)
        if(name === 'lon') setLon(value)
    }

    const handleSubmit = (e) => {
        if(e) e.preventDefault();
        fetchData()
    }

    const handleClearParams = () => {
        setLat('')
        setLon('')
        setErrors(false)
        setIsLoading(false)
        setIsSubmitted(false)
    }

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
                    defaultValue=""
                    variant="outlined"
                    placeholder="Latitude"
                    type="text"
                    name="lat"
                    onChange={handleInputChange}
                    value={lat}
                />
                {/* <TextField
                        error
                        id="outlined-error"
                        label="Error"
                        variant="outlined"
                    />  */}
                <TextField
                    required
                    id="long"
                    label="Longitude"
                    defaultValue=""
                    helperText="*Long refs must be between [-180/+180]"
                    variant="outlined"
                    placeholder="Longitude"
                    type="text"
                    name="lon"
                    onChange={handleInputChange}
                    value={lon}
                />
            </div>
            <Button
                variant="contained"
                type="submit"
                color={isSubmitted ? 'secondary' : 'primary'}
                onClick={() => setIsSubmitted(!isSubmitted)}
            >Check
            </Button>
            <Button
                variant="contained"
                onClick={handleClearParams}
            >Clear
        </Button>
        </form>
            {isLoading && !hasError 
                ? <><CircularProgress /></> 
                : null
            }
            {hasError ? <Alert severity="error">Something went wrong...clear and try again</Alert> : null}
            {isSubmitted && coordsData && !isLoading
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