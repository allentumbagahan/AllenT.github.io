const connection = require("../database/connection")

module.exports = async (arrFields) => {
    try {
        const query = `SELECT ` +
                        `${arrFields}` +
                        `FROM `  +
                        `accounts`
        
        
        const results = await connection(query)
        return results
        
    } catch (error) {
        return []
    }
}