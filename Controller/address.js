const connection = require('../connection');
const { getIP } = require("./clientIP");

const getalladdress = async (req, res) => {
    try {
        const data = await connection.query("select * from address")

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


const getbyidaddress = async (req, res) => {
    try {
        const { add_id } = req.params;
        if (!add_id) {
            return res.status(404).json({
                status: false,
                message: "id not found"
            })
        }

        const data = await connection.query("select * from address where add_id = ?", [add_id]);
        if (data[0][0]?.add_id) {
            return res.json({
                status: true,
                data: data[0]
            })
        } else{
            res.status(404).json({
                status: false,
                message: "wrong ID"

            });
            

        }

    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        })
    }
}

const createaddress = async (req, res) => {
    try {
        const clientIP = getIP(req)
        const { add_name,address,city,state,country,phone_number,email,geo_log,geo_lat,short_order,status } = req.body;

        const data = await connection.query("INSERT INTO address (add_name,address,city,state,country,phone_number,email,geo_log,geo_lat,short_order,status,ip) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 
        [add_name,address,city,state,country,phone_number,email,geo_log,geo_lat,short_order,status, clientIP]);

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

const updatebyidaddress = async (req, res) => {
    try {

        const clientIP = getIP(req)
        const { add_id } = req.params
        if (!add_id) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const { add_name,address,city,state,country,phone_number,email,geo_log,geo_lat,short_order,status } = req.body

        const data = await connection.query("update address set add_name=?,address=?,city=?,state=?,country=?,phone_number=?,email=?,geo_log=?,geo_lat=?,short_order=?,status=?,ip=?  where add_id=?",
         [add_name,address,city,state,country,phone_number,email,geo_log,geo_lat,short_order,status ,clientIP,add_id]);

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

const deleteaddress = async (req, res) => {
    try {
        const {add_id} = req.params
        if (!add_id) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const data = await connection.query("DELETE FROM address WHERE add_id=?", [add_id]);

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


const updatebyidaddressstatus = async (req, res) => {
    try {
        const clientIP = getIP(req)
        const {add_id} = req.params
        if (!add_id) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const {  status } = req.body

        const data = await connection.query("update address set status=? where add_id=?", [status, add_id]);

        if (data[0].changedRows) {
            return res.json({
                status: true,
                message: "status updated successfully"
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


module.exports = { createaddress,getalladdress,getbyidaddress,updatebyidaddress,updatebyidaddressstatus,deleteaddress}