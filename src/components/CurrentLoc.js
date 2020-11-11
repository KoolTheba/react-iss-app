import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'

const CurrentLoc = () => {
    const [time, setTime] = useState("16:09")
    const [lat, setLat] = useState('Latitude')
    const [long, setLong] = useState('Longitude')
    const [hasError, setErrors] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const url = 'http://api.open-notify.org/iss-now.json'

    async function fetchData() {
        setIsLoading(true)
        const res = await fetch(url)
        res.json()
        .then(res => {
            const timestamp = res.timestamp * 1000
            const timeTxt =  new Date(timestamp).toLocaleString();
            setTime(timeTxt)
            setLat(res.iss_position.latitude)
            setLong(res.iss_position.longitude)
            setIsLoading(false)
            setErrors(false)
        })
        .catch(err => setErrors(true))
    }

    useEffect(() => {
        fetchData()
      }, [])

      if(hasError) return <Alert severity="error">Something went wrong...try again</Alert>
      if(isLoading && !hasError) return <CircularProgress />

      return (
        <>
        <div className='location-info'>
            <h1>Current position</h1>
                <p className='time-stamp'>Time: {time}</p>
                <p className='lat-stamp'>Latitude: {lat}</p>
                <p className='long-stamp'>Longitude: {long}</p>
        </div>
        </>
    );
}

export default CurrentLoc