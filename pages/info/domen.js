const { setEnvironmentAndDomen } = require("../../utils/helpers");

const domen = setEnvironmentAndDomen("dev", "copy");

module.exports = domen;
