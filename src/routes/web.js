const express = require("express");
const routes = express.Router();
const app = express();

const axios = require("axios");
const home = require("../controller/home");
const contact = require("../controller/contact")
const products = require("../controller/products")
const product = require("../controller/product")
const about = require("../controller/about")

routes.get("/",  home.Home );
routes.get("/contact",  contact.Contact );
routes.get("/products",  products.Products );
routes.get("/about",  about.About );

routes.get("/product/:slug",  product.Product);






// routes.get("/product/:slug", async(req, res) => {

//     try{

//         let slug = req.params.slug
//         const products = await axios.get(`${process.env.API_URL}getproducts`);
//         const product = await axios.get(`${process.env.API_URL}getproductbyslug/${slug}`);

//         console.log(products.data)
//         res.render('product',{ product:product.data, products:products.data})
//     }catch(err){
//         if(err.response){
//         res.render('product',{ product : null  })
//             console.log(err.response.data)
//             console.log(err.response.status)
//             console.log(err.response.headers) 
//         }else if(err.requiest){
//         res.render('product',{ product: null})
//             console.log(err.requiest)
//         }else{
//         res.render('product',{ product: null})
//             console.error('Error', err.message)
//         }
//     } 
// })


module.exports = routes;