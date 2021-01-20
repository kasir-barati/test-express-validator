const config = {
  verificationCodeLen: 6,
  phoneValidationCountry: "ir",
  appPort: process.env.APP_PORT,
  appHost: process.env.APP_HOST,
};

module.exports = config;

if (!(config.appHost && config.appPort)) {
  console.log("FATAL. ENV", this);
  throw new Error("ENV failed");
}
