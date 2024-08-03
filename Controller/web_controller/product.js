const connection = require('../connection');
// const { getIP } = require("./clientIP");

const product = async (req, res) => {
    try {
        const data = await connection.query("select * from products where status= 1")

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

const productBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug) {
            return res.status(404).json({
                status: false,
                message: "slug not found"
            });
        }

        const [data] = await connection.query("SELECT * FROM products WHERE slug = ?", [slug]);

        if (data.length > 0) {
            return res.status(200).json({
                status: true,
                data: data[0]
            });
        } else {
            return res.status(404).json({
                status: false,
                message: "wrong slug"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message,
        });
    }
};

module.exports = {product , productBySlug}