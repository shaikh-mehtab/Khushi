const connection = require('../connection')
const { getIP } = require("./clientIP");


const createweb_footer = async(req,res) => {
    try {
        const clientIP = getIP(req)
        const { footer_logo,footer_disc,status} = req.body;//footer_logo	footer_disc	status

        const data = await connection.query("INSERT INTO web_footer (footer_logo,footer_disc,status,ip) VALUES (?,?,?,?)", 
        [footer_logo,footer_disc,status,clientIP]);

        res.status(200).json({
            status: true,
            data: data[0],
            ip:clientIP
        })


    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getallweb_footer = async(req,res) =>{
    try {
        const data = await connection.query("SELECT * FROM  web_footer")
        if(data[0]){
            res.status(200).json({
                status:true,
                data:data[0]
            })
        }else{
            res.status(404).json({
                status:false,
                message:" data not found"
    
            })
        }
     } catch (error) {
        res.status(500).json({
            status:false,
            message:error.message
        })
     }
}


const getbyidweb_footer = async (req, res) => {
    try {
        const { footer_id } = req.params;
        if (!footer_id) {
            return res.status(404).json({
                status: false,
                message: "id not found"
            })
        }

        const data = await connection.query("select * from web_footer where footer_id = ?", [footer_id]);
        if (data[0][0]?.footer_id) {
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

const updatebyidweb_footer = async (req, res) => {
    try {

        const clientIP = getIP(req)
        const { footer_id  } = req.params
        if (!footer_id ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const {footer_logo,footer_disc,status } = req.body

         const data = await connection.query("update web_footer set footer_logo=?,footer_disc=?,status=? where footer_id=?", [footer_logo,footer_disc,status, footer_id,clientIP]);

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



const updatebyidweb_footerstatus = async (req, res) => {
    try {
        const clientIP = getIP(req)
        const {footer_id } = req.params
        if (!footer_id ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const {  status } = req.body

        const data = await connection.query("update web_footer set status=? where footer_id =?", [status, footer_id ,clientIP]);

        if (data[0].changedRows) {
            return res.json({
                status: true,
                message: "status updated successfully",
                ip:clientIP
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


const deletebyidweb_footer = async (req, res) => {
    try {
        const {footer_id} = req.params
        if (!footer_id) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const data = await connection.query("DELETE FROM web_footer WHERE footer_id =?", [footer_id ]);

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
// module.exports = {createweb_footer,getallweb_footer,getbyidweb_footer,updatebyidweb_footer,updatebyidweb_footerstatus,deletebyidweb_footer}
module.exports = {createweb_footer,getallweb_footer,getbyidweb_footer,updatebyidweb_footer,updatebyidweb_footerstatus,deletebyidweb_footer}