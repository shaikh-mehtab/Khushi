const connection = require('../connection')
const { getIP } = require("./clientIP");


const createweb_home = async(req,res) => {
    try {
        const clientIP = getIP(req)
        const { home_title,image,newslatter_title,description,meta_title,meta_desc,status,webpage_title,product_title,product_status,fnf_title,fnf_status,testimonial_title,testimonial_status,newslatter_status } = req.body;


        //home_title,newslatter_title,image,description,meta_title,meta_desc,status,webpage_title,product_title,product_status,fnf_title,fnf_status,testimonial_title,testimonial_status,newslatter_status

        const data = await connection.query("INSERT INTO web_home ( home_title,image,newslatter_title,description,meta_title,meta_desc,status,webpage_title,product_title,product_status,fnf_title,fnf_status,testimonial_title,testimonial_status,newslatter_status,ip) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
        [home_title,image,newslatter_title,description,meta_title,meta_desc,status,webpage_title,product_title,product_status,fnf_title,fnf_status,testimonial_title,testimonial_status,newslatter_status,clientIP]);

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

const getallweb_home = async(req,res) =>{
    try {
        const data = await connection.query("SELECT * FROM  web_home")
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


const getbyidweb_home = async (req, res) => {
    try {
        const { home_id } = req.params;
        if (!home_id) {
            return res.status(404).json({
                status: false,
                message: "id not found"
            })
        }

        const data = await connection.query("select * from web_home where home_id = ?", [home_id]);
        if (data[0][0]?.home_id) {
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


const updatebyidweb_home = async (req, res) => {
    try {
        const clientIP = getIP(req)
        const { home_id } = req.params

        if (!home_id) {
            return res.status(404).json({
                status: false,
                message: "ID not found"
            })
        }

        const { home_title, image, newslatter_title, description, meta_title, meta_desc, status, webpage_title, product_title, product_status, fnf_title, fnf_status, testimonial_title, testimonial_status, newslatter_status } = req.body

        const data = await connection.query(
            "UPDATE web_home SET home_title=?, image=?, newslatter_title=?, description=?, meta_title=?, meta_desc=?, status=?, webpage_title=?, product_title=?, product_status=?, fnf_title=?, fnf_status=?, testimonial_title=?, testimonial_status=?, newslatter_status=? WHERE home_id=?",
            [home_title, image, newslatter_title, description, meta_title, meta_desc, status, webpage_title, product_title, product_status, fnf_title, fnf_status, testimonial_title, testimonial_status, newslatter_status, home_id]
        );

        if (data[0].changedRows) {
            return res.json({
                status: true,
                message: "Data updated successfully",
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









const updatebyidweb_homestatus = async (req, res) => {
    try {
        const clientIP = getIP(req)
        const {home_id } = req.params
        if (!home_id ) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const {  status } = req.body

        const data = await connection.query("update web_home set status=? where home_id =?", [status, home_id ,clientIP]);

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


const deletebyidweb_home = async (req, res) => {
    try {
        const {home_id} = req.params
        if (!home_id) {
            res.status(404).json({
                status:false,
                message:"ID not found"
            })
        }

        const data = await connection.query("DELETE FROM web_homes WHERE home_id =?", [home_id ]);

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
module.exports = {createweb_home,getallweb_home,getbyidweb_home,updatebyidweb_home,updatebyidweb_homestatus,deletebyidweb_home}