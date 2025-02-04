const { setEnvironmentAndDomen } = require("../../utils/helpers");

const domen = setEnvironmentAndDomen("release", "copy");

module.exports = domen;
