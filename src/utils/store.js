const proxy = 'https://cors-anywhere.herokuapp.com/';
const getData = (url) => fetch(proxy + url).then(res => res.json())

const getAstros = () => getData('http://api.open-notify.org/astros.json')
const getLocation = () => getData('http://api.open-notify.org/iss-now.json')
const getPassTimes = (lat, lon) => getData(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`)

module.exports = { getAstros, getLocation, getPassTimes }