import React from 'react'

// utils
import {
    risetimeTransform,
    durationTransform,
} from '../../utils/timeTransformer'

// styles
import './TimesTable.css'

export default function TimesTable (props){

    if(props.timesInfo.lenght > 0) return <p>No times available...</p>

    return (
        <>
            <p>Check the times info:</p>
            <table>
                <thead>
                    <tr>
                    <th>Risetime</th>
                    <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {props.timesInfo.map((e, i) => (
                        <tr key={i}>
                        <td>{risetimeTransform(e.risetime)}</td>
                        <td>{durationTransform(e.duration)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}