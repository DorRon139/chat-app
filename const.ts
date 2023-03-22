require('dotenv').config();

const {
    PORT = 3050,
    MONGO_ATLAS_URL,
    DB_NAME,
} = process.env

module.exports = {
    PORT,
    MONGO_ATLAS_URL,
    DB_NAME,
}