const connection = require('../connection');
const { getIP } = require("./clientIP");


const getallcore_values = async (req, res) => {
    try {
        const data = await connection.query("select * from core_values")

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


const getbyidcore_values = async (req, res) => {
    try {
        const { cv_id } = req.params;
        if (!cv_id) {
            return res.status(404).json({
                status: false,
                message: "id not found"
            })
        }

        const data = await connection.query("select * from core_values where cv_id = ?", [cv_id]);
        if (data[0][0]?.cv_id) {
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

const createcore_values = async (req, res) => {
    try {
        const clientIP = getIP(req)
        const { title,icon,image,des,status,sort_order } = req.body;

        const data = await connection.query("INSERT INTO core_values (title,icon,image,des,status,sort_order,ip) VALUES (?,?,?,?,?,?,?)", 
        [title,icon,image,des,status,sort_order,clientIP]);

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

const updatecore_values = async (req, res) => {
    try {

        const clientIP = getIP(req)
        const { cv_id } = req.params
        if (!cv_id) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const { title,icon,image,des,status,sort_order } = req.body

        const data = await connection.query("update core_values set title=?,icon=?,image=?,des=?,status=?,sort_order=?,ip=?  where cv_id=?",
         [title,icon,image,des,status,sort_order ,clientIP,cv_id]);

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

const deletecore_values = async (req, res) => {
    try {
        const { cv_id } = req.params
        if (!cv_id) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
           
        }

        const data = await connection.query("DELETE FROM core_values WHERE cv_id=?", [cv_id]);

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


const updatecore_valuesstatus = async (req, res) => {
    try {
        const { cv_id } = req.params
        if (!cv_id) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const {  status } = req.body

        const data = await connection.query("update core_values set status=? where cv_id=?", [status, cv_id]);

        if (data[0].changedRows) {
           res.json({
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


module.exports = { createcore_values,getallcore_values,getbyidcore_values,updatecore_values,updatecore_valuesstatus,deletecore_values }