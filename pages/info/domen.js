const { setEnvironmentAndDomen } = require("../../utils/helpers");

const domen = setEnvironmentAndDomen("release", "copy");

console.log(domen);

module.exports = domen;
