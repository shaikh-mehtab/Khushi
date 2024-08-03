const express = require("express");
const web_route = express.Router();

const home = require("../web_controller/web_home")
const about = require("../web_controller/web_about")
const contact = require("../web_controller/web_contact")
const footer = require("../web_controller/web_footer")
const product = require("../web_controller/web_product")
const slider = require("../web_controller/web_slider")
const testimonial = require("../web_controller/web_testimonial")
const fnf = require("../web_controller/web_fact_figer")
const core = require("../web_controller/web_core_values")
const address = require("../web_controller/web_address")
const storesetting = require("../web_controller/store_setting")
const products = require("../web_controller/product")

web_route.get("/getallhome",home.getallhome)
web_route.get("/getallabout",about.getallabout)
web_route.get("/getallcontact",contact.getallcontact)
web_route.get("/getallfooter",footer.getallfooter)
web_route.get("/getallproduct",product.getallproduct)
web_route.get("/getallslider",slider.getallslider)
web_route.get("/getalltestimonial",testimonial.getalltestimonial)
web_route.get("/getallfnf",fnf.getallfnf)
web_route.get("/getallcore",core.getallcore)
web_route.get("/getalladdress",address.getalladdress)
web_route.get("/getstoresetting",storesetting.getstoresetting)
web_route.get("/getproducts",products.product)
web_route.get('/getproductbyslug/:slug',products.productBySlug)






module.exports = web_route