



const express = require("express");
const router = express.Router();

const middleware = require("../middleware/auth.js");
const filemanager = require("../Controller/filemanager.js");

const users = require("../Controller/users.js");
const address = require('../Controller/address.js');

const store_setting = require("../Controller/store_setting.js");
const cropperLogic = require("../Controller/cropper.js");

// new 
const sliders = require('../Controller/web_slider.js')
const product = require('../Controller/products.js')
const testimonial = require('../Controller/testimonial.js')
const core_values = require('../Controller/core_values.js')
const fact_figer = require('../Controller/fact_figer.js')
const web_about =  require('../Controller/web_about.js')
const web_contact = require('../Controller/web_contact.js')
const web_footer = require('../Controller/web_footer.js')
const web_home = require('../Controller/web_home.js')
const web_product = require('../Controller/web_product.js')


//authentication

router.post("/login", middleware.login);
router.get("/logout", middleware.logout);


//users
router.get("/getallusers", users.getallusers);
router.get("/getbyidusers/:user_id", users.getbyidusers);
router.post("/createusers", users.createusers);
router.put("/updatebyidusers/:user_id?", users.updatebyidusers);
router.put("/updateuser-status/:user_id?", users.updatebyidassociateuserstatus);
router.delete("/deletebyidusers/:user_id", users.deletebyidusers);



//project
// router.get("/getallproject", project.getallproject);
// router.get("/getbyidproject/:project_id", project.getbyidproject);
// router.post("/createproject", project.createproject);
// router.put("/updatea/:project_id", project.updatebyidproject);
// router.put("/statusa/:project_id", project.updatebyidprojectstatus);
// router.delete("/projectd/:project_id", project.deletebyidproject);



//store_setting
router.get("/getallstore_setting", store_setting.getallstore_setting);
router.get("/getbyid-store_setting/:store_id",store_setting.getbyidstore_setting);
router.post("/create-store_setting", store_setting.createstore_setting);
router.put("/update-store_setting/:store_id",store_setting.updatebyidstore_setting);
router.put("/status-store_setting/:store_id",store_setting.updatebyidstore_settingstatus);
router.delete("/delete-store_setting/:store_id",store_setting.deletebyidstore_setting);


//address
router.post('/create-address',address.createaddress)
router.get('/getall-address',address.getalladdress)
router.get('/getId-address/:add_id',address.getbyidaddress)
router.put('/update-address/:add_id',address.updatebyidaddress)
router.put('/update-address-status/:add_id',address.updatebyidaddressstatus)
router.delete('/delete-address/:add_id',address.deleteaddress);

//filemanager
router.get("/get-files/:directory(*)", filemanager.fetchAllFiles);
router.post("/create-directory/:directory(*)", filemanager.createDirectory);
router.post("/upload-file/:directory(*)", filemanager.uploadFile);
router.delete("/delete-directory/:directory(*)", filemanager.deleteDirectory);
// router.delete("/delete-all/:directory(*)", filemanager.deleteAll);

//image-cropper
router.get("/transform/:filename", cropperLogic.cropperLogic);

// router.get("/test", getbyidtest);

// new
//core_values
router.post('/create-core_values',core_values.createcore_values)
router.get('/getall-core_values',core_values.getallcore_values)
router.get('/getId-core_values/:cv_id',core_values.getbyidcore_values)
router.put('/update-core_values/:cv_id',core_values.updatecore_values)
router.put('/update-core_values-status/:cv_id',core_values.updatecore_valuesstatus)
router.delete('/delete-core_values/:cv_id',core_values.deletecore_values);

//fact_figer
router.post('/create-fact_figer',fact_figer.createfact_figer)
router.get('/getall-fact_figer',fact_figer.getallfact_figer)
router.get('/getId-fact_figer/:f_id',fact_figer.getbyidfact_figer)
router.put('/update-fact_figer/:f_id',fact_figer.updatefact_figer)
router.put('/update-fact_figer-status/:f_id',fact_figer.updatefact_figerstatus)
router.delete('/delete-fact-finger/:f_id',fact_figer.deletefact_figer );

//WEB_SLIDER
router.post('/create-web-slider',sliders.createslider)
router.get('/getall-web-slider',sliders.getallslider)
router.get('/getId-web-slider/:slider_id',sliders.getbyidslider)
router.put('/update-web-slider/:slider_id',sliders.updatebyidslider)
router.put('/update-web-slider-status/:slider_id',sliders.updatebyidsliderstatus)
router.delete('/delete-web-slider/:slider_id',sliders.deletebyidslider);

//products
router.post('/create-products',product.createproducts)
router.get('/getall-products',product. getallproducts)
router.get('/getId-products/:product_id',product.getbyidproducts)
router.put('/update-products/:product_id',product. updatebyidproducts)
router.put('/update-products-status/:product_id',product.updatebyidproductsstatus)
router.delete('/delete-products/:product_id',product.deletebyidproducts);


//testimonial
router.post('/create-testimonial',testimonial.createtestimonial)
router.get('/getall-testimonial',testimonial. getalltestimonial)
router.get('/getId-testimonial/:t_id',testimonial.getbyidtestimonial)
router.put('/update-testimonial/:t_id',testimonial. updatebyidtestimonial)
router.put('/update-testimonial-status/:t_id',testimonial.updatebyidtestimonialstatus)
router.delete('/delete-testimonial/:t_id',testimonial.deletebyidtestimonial);


//web-about
router.post('/create-web-about',web_about.createweb_about)
router.get('/getall-web-about',web_about. getallweb_about)
router.get('/getId-web-about/:about_id',web_about.getbyidweb_about)
router.put('/update-web-about/:about_id',web_about.updatebyidweb_about)
router.put('/update-web-about-status/:about_id',web_about.updatebyidweb_aboutstatus)
router.delete('/delete-web-about/:about_id',web_about.deletebyidweb_about);


//web_contact
router.post('/create-web_contact',web_contact.createweb_contact)
router.get('/getall-web_contact',web_contact. getallweb_contact)
router.get('/getId-web_contact/:contact_id',web_contact.getbyidweb_contact)
router.put('/update-web_contact/:contact_id',web_contact.updatebyidweb_contact)
router.put('/update-web_contact-status/:contact_id',web_contact.updatebyidweb_contactstatus)
router.delete('/delete-web_contact/:contact_id',web_contact.deletebyidweb_contact);

//web_footer
router.post('/create-web_contact',web_contact.createweb_contact)
router.get('/getall-web_contact',web_contact. getallweb_contact)
router.get('/getId-web_contact/:contact_id',web_contact.getbyidweb_contact)
router.put('/update-web_contact/:contact_id',web_contact.updatebyidweb_contact)
router.put('/update-web_contact-status/:contact_id',web_contact.updatebyidweb_contactstatus)
router.delete('/delete-web_contact/:contact_id',web_contact.deletebyidweb_contact);

//web_footer
router.post('/create-web-footer',web_footer.createweb_footer)
router.get('/get-web-footer',web_footer. getallweb_footer)
router.get('/getId-web-footer/:footer_id',web_footer.getbyidweb_footer)
router.put('/update-web-footer/:footer_id',web_footer.updatebyidweb_footer)
router.put('/update-web-footer-status/:footer_id',web_footer.updatebyidweb_footerstatus)
router.delete('/delete-web-footer/:footer_id',web_footer.deletebyidweb_footer);

//Web_home
router.post('/create-web-home',web_home.createweb_home)
router.get('/get-web-home',web_home. getallweb_home)
router.get('/get-web-home/:home_id',web_home.getbyidweb_home)
router.put('/update-web-home/:home_id',web_home.updatebyidweb_home)
router.put('/update-web-home-status/:home_id',web_home.updatebyidweb_homestatus)
router.delete('/delete-web-home/:home_id',web_home.deletebyidweb_home);


//web_product
router.post('/create-web-product',web_product.createweb_product)
router.get('/get-web-product',web_product. getallweb_product)
router.get('/get-web-product/:p_id',web_product.getbyidweb_product)
router.put('/update-web-product/:p_id',web_product.updatebyidweb_product)
router.put('/update-web-product-status/:p_id',web_product.updatebyidweb_productstatus)
router.delete('/delete-web-product/:p_id',web_product.deletebyidweb_product);

module.exports = router;


