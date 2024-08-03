const connection = require('../connection')
const { getIP } = require("./clientIP");


const createweb_product = async(req,res) => {
    try {
        const clientIP = getIP(req)
        const {page_title,meta_title,meta_description,breadcrumd_name,cover_image,status} = req.body;

        const data = await connection.query("INSERT INTO web_product (page_title,meta_title,meta_description,breadcrumd_name,cover_image,status,ip) VALUES (?,?,?,?,?,?,?)", 
        [page_title,meta_title,meta_description,breadcrumd_name,cover_image,status,clientIP]);

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

const getallweb_product = async(req,res) =>{
    try {
        const data = await connection.query("SELECT * FROM  web_product")
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


const getbyidweb_product = async (req, res) => {
    try {
        const { p_id  } = req.params;
        if (!p_id ) {
            return res.status(404).json({
                status: false,
                message: "id not found"
            })
        }

        const data = await connection.query("select * from web_product where p_id =?", [p_id ]);
        if (data[0][0]?.p_id ) {
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

const updatebyidweb_product = async (req, res) => {
    try {

        const clientIP = getIP(req)
        const { p_id   } = req.params
        if (!p_id  ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const {page_title,meta_title,meta_description,breadcrumd_name,cover_image,status } = req.body

         const data = await connection.query("update web_product set page_title=?,meta_title=?,meta_description=?,breadcrumd_name=?,cover_image=?,status=? where p_id =?",
          [ page_title,meta_title,meta_description,breadcrumd_name,cover_image,status,p_id ,clientIP]);

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



const updatebyidweb_productstatus = async (req, res) => {
    try {
        const clientIP = getIP(req)
        const {p_id  } = req.params
        if (!p_id  ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const {  status } = req.body

        const data = await connection.query("update web_product set status=? where p_id  =?", [status, p_id  ,clientIP]);

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


const deletebyidweb_product = async (req, res) => {
    try {
        const {p_id } = req.params
        if (!p_id ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const data = await connection.query("DELETE FROM web_product WHERE p_id =?",[p_id  ]);

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

module.exports = {createweb_product,getallweb_product,getbyidweb_product,updatebyidweb_product,updatebyidweb_productstatus,deletebyidweb_product}