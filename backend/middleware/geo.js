const geoip = require('geoip-lite');

const getLocation = (ip)=>{
    return geoip.lookup(ip)
}

module.exports = {getLocation}