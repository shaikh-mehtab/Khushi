const connection = require('../connection');
// const { getIP } = require("./clientIP");

const getstoresetting = async (req, res) => {
    try {
        const data = await connection.query("select * from store_setting where status = 1 ")

        if (data && data[0].length > 0) {
            res.status(200).json({
                data: data[0]
            });
        } else {
            res.status(404).json({
                status: false,
                message: "Record not found"

            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        })
    }
}

module.exports = {getstoresetting }