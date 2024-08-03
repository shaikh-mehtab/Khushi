const connection = require('../connection')
const { getIP } = require("./clientIP");


const createweb_about = async(req,res) => {
    try {
        const clientIP = getIP(req)
        const { page_title,meta_title,about_img,meta_description,about_title,about_des,breadcumb_name,cover_image,mission_title,mission_description,vision_title,vision_description,mv_image,status} = req.body;

        const data = await connection.query("INSERT INTO web_about (page_title,meta_title,meta_description,about_img,about_title,about_des,breadcumb_name,cover_image,mission_title,mission_description,vision_title,vision_description,mv_image,status,ip) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
        [page_title,meta_title,meta_description,about_img,about_title,about_des,breadcumb_name,cover_image,mission_title,mission_description,vision_title,vision_description,mv_image,status,clientIP]);

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

const getallweb_about = async(req,res) =>{
    try {
        const data = await connection.query("SELECT * FROM  web_about")
        if(data[0]){
            res.status(200).json({
                status:false,
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


const getbyidweb_about = async (req, res) => {
    try {
        const { about_id } = req.params;
        if (!about_id) {
            return res.status(404).json({
                status: false,
                message: "id not found"
            })
        }

        const data = await connection.query("select * from web_about where about_id = ?", [about_id]);
        if (data[0][0]?.about_id) {
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

const updatebyidweb_about = async (req, res) => {
    try {

        const clientIP = getIP(req)
        const { about_id } = req.params
        if (!about_id) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const { page_title,meta_title,about_img,meta_description,about_title,about_des,breadcumb_name,cover_image,mission_title,mission_description,vision_title,vision_description,mv_image,status } = req.body

        const data = await connection.query("update web_about set page_title=?,meta_title=?,meta_description=?,about_img=?,about_title=?,about_des=?,breadcumb_name=?,cover_image=?,mission_title=?,mission_description=?,vision_title=?,vision_description=?,mv_image=?,status=?,ip=? where about_id=?",
         [page_title,meta_title,meta_description,about_img,about_title,about_des,breadcumb_name,cover_image,mission_title,mission_description,vision_title,vision_description,mv_image,status ,clientIP,about_id]);

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



const updatebyidweb_aboutstatus = async (req, res) => {
    try {
        const clientIP = getIP(req)
        const {about_id} = req.params
        if (!about_id) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const {  status } = req.body

        const data = await connection.query("update web_about set status=? where about_id=?", [status, about_id,clientIP]);

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


const deletebyidweb_about = async (req, res) => {
    try {
        const {about_id} = req.params
        if (!about_id) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const data = await connection.query("DELETE FROM web_about WHERE about_id=?", [about_id]);

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
module.exports = {createweb_about,getallweb_about,getbyidweb_about,updatebyidweb_about,updatebyidweb_aboutstatus,deletebyidweb_about}