const connection = require("../database/connection")

module.exports = async (username, password) => {
    try {
        const query = `INSERT INTO ` +
                        `accounts ` +
                        `VALUES `  +
                        `(null, '${username}', md5('${password}'))`
        
        await connection(query)
        
        return true
        
    } catch (error) {
        return false
    }
}