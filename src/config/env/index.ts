export default () => {
  return {
    cryptoKey: process.env.CRYPTO_KEY,
    ivHexKey: process.env.IV_HEX_KEY,

    port: parseInt(process.env.PORT, 10),
    expiresIn: process.env.EXPIRES_IN,
    jwtSecret: process.env.JWT_SECRET,
    refreshSecret: process.env.REFRESH_JWT_SECRET,
    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN,

    adminID: process.env.ADMIN_ID,
    adminPassword: process.env.ADMIN_PASSWORD,
    adminEmail: process.env.ADMIN_EMAIL,
    adminFullName: process.env.ADMIN_FULL_NAME,
    adminCPF: process.env.ADMIN_CPF,
  };
};
