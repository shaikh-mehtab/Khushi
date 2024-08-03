const express = require("express");
const axios = require("axios");

const instance = axios.create({
    baseURL: 'http://khushi.cometdigisol.com/web-api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

exports.Product = async function (req, res, next) {
    // try{

    //     let slug = req.params.slug
    //     const products = await instance.get(`product`);
    //     const product = await instance.get(`getproductbyslug/${slug}`);
    //     const footerResponse = await instance.get(`getallfooter`);
    //   const addressResponse = await instance.get(`getalladdress`);
    //   const store_setting = await instance.get(`getstoresetting`);
    //   const p = await instance.get(`getproducts`);
      
    //     res.render('product',{ products: products.data, product:product.data, footer: footerResponse.data, address: addressResponse.data, store: store_setting.data, p: p.data})
    // }catch(err){
    //     if(err.response){
    //     res.render('product',{ product : null  })
    //         console.log(err.response.data)
    //         console.log(err.response.status)
    //         console.log(err.response.headers) 
    //     }else if(err.requiest){
    //     res.render('product',{ product: null})
    //         console.log(err.requiest)
    //     }else{
    //     res.render('product',{ product: null})
    //         console.error('Error', err.message)
    //     }
    // }      



    try{

        let slug = req.params.slug
        const products = await instance.get(`getproducts`);
        const product = await instance.get(`getproductbyslug/${slug}`);
        const footerResponse = await instance.get(`getallfooter`);
      const addressResponse = await instance.get(`getalladdress`);
      const store_setting = await instance.get(`getstoresetting`);
      const p = await instance.get(`getproducts`);

        console.log(products.data)
        res.render('product',{ product:product.data, products:products.data, footer: footerResponse.data, address: addressResponse.data, store: store_setting.data, p: p.data})
    }catch(err){
        if(err.response){
        res.render('product',{ product : null  })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers) 
        }else if(err.requiest){
        res.render('product',{ product: null})
            console.log(err.requiest)
        }else{
        res.render('product',{ product: null})
            console.error('Error', err.message)
        }
    } 
}