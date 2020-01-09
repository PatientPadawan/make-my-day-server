module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: process.env.REACT_APP_CLIENT_ORIGIN || "https://make-my-day-entertainment.now.sh/",
    CLIENT_ID: process.env.CLIENT_ID,
    ISSUER: process.env.ISSUER,
    EMAIL_USER: process.env.EMAIL_USER || 'YOUR_EMAIL_ADDRESS', 
    EMAIL_PASS: process.env.EMAIL_PASS || 'PASSWORD_FOR_EMAIL'
}