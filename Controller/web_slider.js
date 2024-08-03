const connection = require('../connection');
const { getIP } = require("./clientIP");


const getallslider = async (req, res) => {
    try {
        
        const data = await connection.query("SELECT * FROM web_slider ")

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


const getbyidslider= async (req, res) => {
    try {
        const { slider_id } = req.params;
        if (!slider_id) {
            return res.status(404).json({
                status: false,
                message: "id not found"
            })
        }

        const data = await connection.query("select * from web_slider where slider_id = ?", [slider_id]);
        if (data[0][0]?.slider_id) {
            return res.json({
                status: true,
                data:data[0]
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

const createslider = async (req, res) => {
    try {
        const clientIP = getIP(req)
        const { slider_title,slider_description,slider_image,status} = req.body;

        const data = await connection.query("INSERT INTO web_slider (slider_title,slider_description,slider_image,ip,status) VALUES (?, ?,?,?,?)",
         [slider_title,slider_description,slider_image,status,clientIP]);

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


const updatebyidslider= async(req,res)=>{
    try {

        const clientIP = getIP(req);

        const {slider_id}= req.params
    if(!slider_id){
        res.status(404).json({
            status:false,
            message:"id not found"
        })
    }
   
        const {  slider_title,slider_description,slider_image,status} = req.body;
        const data = await connection.query("update  web_slider set  slider_title=?,slider_description=?,slider_image=?,status=?,ip=? where slider_id=?", 
        [ slider_title,slider_description,slider_image,status,clientIP,slider_id ]);

    if(data[0].changedRows){
        return res.status(404).json({
            status:true,
            message:"data update successfully"

        })
    }else{
        res.status(404).json({
            status:false,
            message:"failed to update",
            ip:clientIP
        })
    }
    } catch (error) {
        res.status(500).json({
            status:false,
            message:error.message
        })
        
    }
}
const deletebyidslider = async (req, res) => {
    try {
        const { slider_id } = req.params
        if (!slider_id) {
            return res.status(400).json({
                status: false,
                message: "Id not present"
            });
        }

        const data = await connection.query("DELETE FROM web_slider WHERE slider_id=?", [slider_id]);

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


const updatebyidsliderstatus = async(req,res) => {
    try {
const clientIP = getIP(req)
      const{slider_id} = req.params;
  
      if(!slider_id){
          res.status(404).json({
              status:false,
              message:"id not found"
          })
      }
  
      const{ status } = req.body;
      const data = await connection.query("update  web_slider set status=?,ip=? where slider_id=?",
      [status,clientIP,slider_id])

      if(data[0].changedRows){
          res.status(200).json({
              status:false,
              message:"status update successfully",
              ip:clientIP
            
          })
      }else{
          res.status(404).json({
              status:false,
              message:"failed to updated"
          })
      }
    } catch (error) {
      res.status(500).json({
          status:false,
          message:error.message
      })  
    }
  }
  


module.exports = { getallslider,getbyidslider, createslider,updatebyidslider, deletebyidslider,updatebyidsliderstatus};