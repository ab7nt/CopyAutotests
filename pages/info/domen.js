const { setEnvironmentAndDomen } = require("../../utils/helpers");

const domen = setEnvironmentAndDomen("dev", "copy");

console.log(domen);

module.exports = domen;
