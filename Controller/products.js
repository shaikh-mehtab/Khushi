const { getIP } = require("./clientIP");
const connection = require('../connection');


const getallproducts = async (req, res) => {
    try {
        const data = await connection.query("select * from products")

        if (data && data[0].length > 0) {
            res.status(200).json({
                status: true,
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


const getbyidproducts = async (req, res) => {
    try {
        const {product_id  } = req.params;
        if (!product_id ) {
            return res.status(404).json({
                status: false,
                message: "id not found"
            })
        }

        const data = await connection.query("select * from products where product_id = ?", [product_id ]);
        if (data[0][0]?.product_id ) {
            return res.json({
                status: true,
                data: data[0]
            })
        } else {
            return res.json({
                status: false,
                message: "wrong id"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        })
    }
}

const createproducts = async (req, res) => {
    try {
        const clientIP = getIP(req)
        const {title,description,image,bradcrame_name,bradcrame_image,webpage_title,meta_title,meta_description,slug,status } = req.body;

        const data = await connection.query("INSERT INTO products (title,description,image,bradcrame_name,bradcrame_image,webpage_title,meta_title,meta_description,slug,status,ip) VALUES (?,?,?,?,?,?,?,?,?,?,?)", 
        [title,description,image,bradcrame_name,bradcrame_image,webpage_title,meta_title,meta_description,slug,status,clientIP]);

        res.status(200).json({
            status: true,
            data: data[0],
            ip:clientIP
        })


    } catch (error) {
        res.json({
            error: error.message
        })
    }
}

const updatebyidproducts = async (req, res) => {
    try {

        const clientIP = getIP(req)
        const {product_id  } = req.params
        if (!product_id ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const { title,description,image,bradcrame_name,bradcrame_image,webpage_title,meta_title,meta_description,slug,status  } = req.body

        const data = await connection.query("update products set title=?,description=?,image=?,bradcrame_name=?,bradcrame_image=?,webpage_title=?,meta_title=?,meta_description=?,slug=?,status=?,ip=? where product_id =?",
         [title,description,image,bradcrame_name,bradcrame_image,webpage_title,meta_title,meta_description,slug,status, clientIP,product_id ]);

        if (data[0].changedRows) {
            return res.json({
                status: true,
                message:"data update successfully",
                ip: clientIP
            });
        } else {
            return res.json({
                status: false,
                message: "Failed to update"
            })
        }

    } catch (error) {
        res.json({
            error: error.message
        })
    }
}

const deletebyidproducts = async (req, res) => {
    try {
        const {product_id } = req.params
        if (!product_id ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const data = await connection.query("DELETE FROM products WHERE product_id  =?", [product_id ]);

        if (data[0].affectedRows) {
            return res.json({
                status: true,
                message: " Deleted successfully"
            });
        } else if (data[0].affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: "Wrong ID"
            });
        }else {
            return res.json({
                status: false,
                message: "Failed to delete"
            })
        }
    } catch (error) {
        res.json({
            status: false,
            error: error.message
        })
    }
}

const updatebyidproductsstatus = async (req, res) => {
    try {

        const clientIP = getIP(req)
        const {product_id  } = req.params
        if (!product_id ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const { status  } = req.body

        const data = await connection.query("update products set status=?,ip=? where product_id =?",
         [status, clientIP,product_id ]);

        if (data[0].changedRows) {
            return res.json({
                status: true,
                message:"data update successfully",
                ip: clientIP
            });
        } else {
            return res.json({
                status: false,
                message: "Failed to update"
            })
        }

    } catch (error) {
        res.json({
            error: error.message
        })
    }
}



module.exports = { getallproducts, getbyidproducts, createproducts, updatebyidproducts, deletebyidproducts,updatebyidproductsstatus };