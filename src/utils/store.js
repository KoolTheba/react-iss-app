const getData = (url) => fetch(url).then(res => res.json())

const getAstros = () => getData('http://api.open-notify.org/astros.json')
const getLocation = () => getData('http://api.open-notify.org/iss-now.json')

module.exports = { getAstros, getLocation }