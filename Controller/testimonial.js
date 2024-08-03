const connection = require('../connection');
const { getIP } = require("./clientIP");


const getalltestimonial = async (req, res) => {
    try {
        const data = await connection.query("select * from testimonial")

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


const getbyidtestimonial = async (req, res) => {
    try {
        const {t_id  } = req.params;
        if (!t_id ) {
            return res.status(404).json({
                status: false,
                message: "id not found"
            })
        }

        const data = await connection.query("select * from testimonial where t_id = ?", [t_id ]);
        if (data[0][0]?.t_id ) {
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

const createtestimonial = async (req, res) => {
    try {
        const clientIP = getIP(req)
        const {name,message,company,designation,status} = req.body;

        const data = await connection.query("INSERT INTO testimonial (name,message,company,designation,status,ip) VALUES (?,?,?,?,?,?)", 
        [name,message,company,designation,status,clientIP]);

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

const updatebyidtestimonial = async (req, res) => {
    try {

        const clientIP = getIP(req)
        const {t_id  } = req.params
        if (!t_id ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const { name,message,company,designation,status,image } = req.body

        const data = await connection.query("update testimonial set name=?,message=?,image=?,company=?,designation=?,status=?,ip=? where t_id =?",
         [name,message,image,company,designation,status,clientIP,t_id ]);

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

const deletebyidtestimonial = async (req, res) => {
    try {
        const {t_id } = req.params
        if (!t_id ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const data = await connection.query("DELETE FROM testimonial WHERE t_id  =?", [t_id ]);

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

const updatebyidtestimonialstatus = async (req, res) => {
    try {

        const clientIP = getIP(req)
        const {t_id  } = req.params
        if (!t_id ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const { status  } = req.body

        const data = await connection.query("update testimonial set status=?,ip=? where t_id =?",
         [status, clientIP,t_id ]);

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



module.exports = { getalltestimonial, getbyidtestimonial, createtestimonial, updatebyidtestimonial, deletebyidtestimonial,updatebyidtestimonialstatus };