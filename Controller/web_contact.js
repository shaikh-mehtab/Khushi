const connection = require('../connection')
const { getIP } = require("./clientIP");


const createweb_contact = async(req,res) => {
    try {
        const clientIP = getIP(req)
        const { page_title,meta_title,meta_description,form_title,breadcrumd_name,cover_image,status} = req.body;

        const data = await connection.query("INSERT INTO web_contact (page_title,meta_title,meta_description,form_title,breadcrumd_name,cover_image,status,ip) VALUES (?,?,?,?,?,?,?,?)", 
        [page_title,meta_title,meta_description,form_title,breadcrumd_name,cover_image,status,clientIP]);

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

const getallweb_contact = async(req,res) =>{
    try {
        const data = await connection.query("SELECT * FROM  web_contact")
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


const getbyidweb_contact = async (req, res) => {
    try {
        const { contact_id} = req.params;
        if (!contact_id) {
            return res.status(404).json({
                status: false,
                message: "id not found"
            })
        }

        const data = await connection.query("select * from web_contact where contact_id = ?", [contact_id]);
        if (data[0][0]?.contact_id) {
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



const updatebyidweb_contact = async (req, res) => {
    try {
        const clientIP = getIP(req) 

        const { contact_id   } = req.params
        if (!contact_id  ) {
            res.status(404).json({
                status:false,
                message:"id not found"
            })
        }

        const { page_title,meta_title,meta_description,form_title,breadcrumd_name,cover_image,status } = req.body

        const data = await connection.query("update web_contact set page_title=?,meta_title=?,meta_description=?,form_title=?,breadcrumd_name=?,cover_image=?,status=?,ip=? where contact_id =?", 
        [page_title,meta_title,meta_description,form_title,breadcrumd_name,cover_image,status,clientIP, contact_id ]);

        if (data[0].changedRows) {
            return res.json({
                status: true,
                message: "Update Successfully",
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



const updatebyidweb_contactstatus = async (req, res) => {
    try {
        const clientIP = getIP(req)
        const {contact_id} = req.params
        if (!contact_id) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const {  status } = req.body

        const data = await connection.query("update web_contact set status=? where contact_id=?", [status, contact_id,clientIP]);

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


const deletebyidweb_contact = async (req, res) => {
    try {
        const {contact_id} = req.params
        if (!contact_id) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const data = await connection.query("DELETE FROM web_contact WHERE contact_id=?", [contact_id]);

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
module.exports = {createweb_contact,getallweb_contact,getbyidweb_contact,updatebyidweb_contact,updatebyidweb_contactstatus,deletebyidweb_contact}