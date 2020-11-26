import React, { useState } from 'react';

import { getPassTimes } from '../../utils/store';

import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// styles
import './PassTimes.css'

export default function PassTimes () {

    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [coordsData, setCoordsData] = useState({});
    const [hasError, setErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const { response } = await getPassTimes(lat, lon)
            console.log('DATA.RESPONSE', response)
            setCoordsData(response)
            setIsLoading(false)
            setLat('')
            setLon('')
            setErrors(false)
            setIsSubmitted(false)
            console.log('COORDS', coordsData)
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
            <h4>Soy lat {lat}</h4>
            <h4>Soy long {lon}</h4>
        <form
            onSubmit={handleSubmit}
            className={'latlong-form'}
            autoComplete="off">
            <div>
                <TextField
                    id="outlined-error-helper-text lat"
                    label="Latitude"
                    helperText="*Lat refs must be between [-90/+90]"
                    defaultValue=""
                    variant="outlined"
                    placeholder="Latitude"
                    type="text"
                    name="lat"
                    required
                    onChange={handleInputChange}
                    value={lat}
                    min='-90'
                    max='90'
                />
                <TextField
                    id="outlined-error-helper-text long"
                    label="Longitude"
                    defaultValue=""
                    helperText="*Long refs must be between [-180/+180]"
                    variant="outlined"
                    placeholder="Longitude"
                    type="text"
                    name="lon"
                    required
                    onChange={handleInputChange}
                    value={lon}
                    min='-180'
                    max='180'
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
            ? <><p>Fetching data...</p><CircularProgress /></> 
            : null
        }
        {hasError ? <Alert severity="error">Something went wrong...clear and try again</Alert> : null}
        </div>
        </>
    );
}