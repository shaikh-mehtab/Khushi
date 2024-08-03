const connection = require('../connection');
const { getIP } = require("./clientIP");

const getallfact_figer = async (req, res) => {
    try {
        const data = await connection.query("select * from fact_figer")

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


const getbyidfact_figer = async (req, res) => {
    try {
        const { f_id  } = req.params;
        if (!f_id ) {
            return res.status(404).json({
                status: false,
                message: "id not found"
            })
        }

        const data = await connection.query("select * from fact_figer where f_id  = ?", [f_id ]);
        if (data[0][0]?.f_id ) {
            return res.json({
                status: true,
                data: data[0]    
            })
        } else {
            return res.json({
                status: false,
                message: "wrong ID"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        })
    }
}

const createfact_figer = async (req, res) => {
    try {
        const clientIP = getIP(req)
        const { title,description,number,symbol,icon,status } = req.body;

        const data = await connection.query("INSERT INTO fact_figer (title,description,number,symbol,icon,status,ip) VALUES (?,?,?,?,?,?,?)", 
        [title,description,number,symbol,icon,status,clientIP]);

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

const updatefact_figer = async (req, res) => {
    try {

        const clientIP = getIP(req)
        const { f_id  } = req.params
        if (!f_id ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const {title,description,number,symbol,icon,status} = req.body

        const data = await connection.query("update fact_figer set title=?,description=?,number=?,symbol=?,icon=?,status=?,ip=?  where f_id =?",
         [title,description,number,symbol,icon,status ,clientIP,f_id ]);

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

const deletefact_figer = async (req, res) => {
    try {
        const { f_id  } = req.params
        if (!f_id ) {
            throw new Error("Id not present")
        }

        const data = await connection.query("DELETE FROM fact_figer WHERE f_id =?", [f_id ]);

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


const updatefact_figerstatus = async (req, res) => {
    try {
        const { f_id  } = req.params
        if (!f_id ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const {  status } = req.body

        const data = await connection.query("update fact_figer set status=? where f_id =?", [status, f_id ]);

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





module.exports = { createfact_figer,getallfact_figer,getbyidfact_figer,updatefact_figer,updatefact_figerstatus,deletefact_figer }