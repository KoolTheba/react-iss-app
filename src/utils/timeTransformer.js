const risetimeTransform = (t) => {
    const timestamp = t*1000
    return new Date(timestamp).toLocaleString()
}

const durationTransform = (d) => {
    d = Number(d);
    const h = Math.floor(d / 3600)
    const m = Math.floor(d % 3600 / 60)
    const s = Math.floor(d % 3600 % 60)

    const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    
    return hDisplay + mDisplay + sDisplay;
}

export { risetimeTransform, durationTransform }