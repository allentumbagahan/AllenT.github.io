const connection = require("../database/connection")

module.exports = async (id, username, password) => {
    try {
        const query = `UPDATE ` +
                        `accounts ` +
                        `SET `  +
                        `username = '${username}'` +
                        `password = '${password}'` +
                        `WHERE ` +
                        `id = ${id}`
        
        await connection(query)
        return true
        
    } catch (error) {
        return false
    }
}