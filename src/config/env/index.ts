export default () => {
  return {
    cryptoKey: process.env.CRYPTO_KEY,
    ivHexKey: process.env.IV_HEX_KEY,

    port: parseInt(process.env.PORT, 10),
    expiresIn: process.env.EXPIRES_IN,
    jwtSecret: process.env.JWT_SECRET,
    refreshSecret: process.env.REFRESH_JWT_SECRET,
    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN,

    fileBaseKey: process.env.FILE_BASE_KEY,
    fileBaseSecret: process.env.FILE_BASE_SECRET,

    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleSecret: process.env.GOOGLE_SECRET,
    googleRedirectURI: process.env.GOOGLE_REDIRECT_URI,

    adminID: process.env.ADMIN_ID,
    adminPassword: process.env.ADMIN_PASSWORD,
    adminEmail: process.env.ADMIN_EMAIL,
    adminFullName: process.env.ADMIN_FULL_NAME,
    adminCPF: process.env.ADMIN_CPF,
  };
};
