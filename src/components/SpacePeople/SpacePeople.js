import React, { useState, useEffect } from 'react'
import { getAstros } from '../../utils/store'

// UI elements
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'

// styles
import './SpacePeople.css'

const SpacePeople = () => {
    const [astros, setAstros] = useState([])
    const [hasError, setErrors] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const timeTxt =  new Date().toLocaleString();

    const fetchData = async () => {
        if(!astros) setIsLoading(true)

        try {
            await getAstros()
            .then(data => {
                setAstros(data.people)
                setIsLoading(false)
            })
        } catch (error){
            setErrors(true)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if(hasError) {
        return (
            <Alert 
                severity="error"
            >Something went wrong retrieving People in the Space...try again
            </Alert>
        )
    }

    if(isLoading) return <CircularProgress />

    return (
        <>
        <section className="astros-section">
            <h2>People currently in the ISS</h2>
                <p>(Date and time: {timeTxt})</p>
                <ul>
                {astros.map(astro => (
                    <li key={astro.name}>
                        <h4>
                            <span role='img' aria-label="image">👩‍🚀</span> 
                        {astro.name}
                        </h4>
                    </li>
                ))}
                </ul>
        </section>
        </>
    )
}

export default SpacePeople