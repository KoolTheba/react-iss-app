import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import StopIcon from '@material-ui/icons/Stop'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

import './CurrentLoc.css'

const CurrentLoc = (props) => {

    const { refreshMs=10000 } = props
    const [time, setTime] = useState()
    const [lat, setLat] = useState()
    const [long, setLong] = useState()
    const [isRealTime, setIsRealTime] = useState(false)
    const [reverseCount, setReverseCount] = useState(refreshMs)
    const [hasError, setErrors] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const url = 'http://api.open-notify.org/iss-now.json'

    const fetchData = async () => {
        if(!lat) setIsLoading(true)

        try {
            await fetch(url)
            .then(res => res.json())
            .then(res => {
                const timestamp = res.timestamp * 1000
                const timeTxt =  new Date(timestamp).toLocaleString()
                setTime(timeTxt)
                setLat(res.iss_position.latitude)
                setLong(res.iss_position.longitude)
                setIsLoading(false)
            })
        } catch (error) {
            setErrors(true)
        }
    }

    useEffect(() => {
        fetchData()
        let dataInterval

        if(isRealTime) {
            dataInterval = setInterval(fetchData, refreshMs)
            return () => {
                clearInterval(dataInterval)
            }
        }
    }, [isRealTime, refreshMs]);

    useEffect(() => {
        let countDownInterval;
        if(isRealTime) {
            countDownInterval = setInterval(() => {
                setReverseCount(reverseCount <= 0 ? refreshMs : reverseCount - 1000)
            }, 1000)

            return () => {
                clearInterval(countDownInterval)
            }
        }
    }, [reverseCount, isRealTime, refreshMs]);

      if(hasError) return <Alert severity="error">Something went wrong...try again</Alert>
      if(isLoading && !hasError) return <CircularProgress />

      return (
        <>
        <div className='location-section'>
            <h2>ISS Current position</h2>
            <p className='time-stamp'>Time: {time}</p>
            <p className='lat-stamp'>Latitude: {lat}</p>
            <p className='long-stamp'>Longitude: {long}</p>
        </div>

        <div className="real-time-section">
            <h2>Want to see the ISS orbita in Realtime?</h2>
            <h3><span role='img' aria-label="point-doen finger">👇</span>Just click!</h3>
            <Button
                variant="contained"
                color={isRealTime ? 'secondary': 'primary'}
                startIcon= {isRealTime ? <StopIcon /> : <PlayArrowIcon />}
                onClick={() => setIsRealTime(!isRealTime)}
            >Real time</Button>
            {isRealTime 
                ? <p className="refresh-info">(Data will be refreshed in {(reverseCount/1000)}s)</p>
                : null
            }
        </div>
        </>
    );
}

export default CurrentLoc