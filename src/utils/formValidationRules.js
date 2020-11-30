export default function validate(values){
    
    let errors = {}

    const latitude = Number(values.latitude)
    const longitude = Number(values.longitude)

    if(!latitude){
        errors.latitude = 'Latitude parameter is required'
    } else if (latitude < -90 || latitude > 90){
        errors.latitude = 'Latitude must be a value between -90 and 90'
    }

    if(!longitude){
        errors.longitude = 'Longitude parameter is required'
    } else if (longitude < -180 || longitude > 180){
        errors.longitude = 'Longitude must be a value between -180 and 180'
    }

    return errors
}
