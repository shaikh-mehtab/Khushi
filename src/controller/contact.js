const express = require("express");
const axios = require("axios");

const instance = axios.create({
    baseURL: 'http://khushi.cometdigisol.com/web-api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });


exports.Contact = async function (req, res, next) {
    try{
        const contact = await instance.get(`getallcontact`);
        const footerResponse = await instance.get(`getallfooter`);
      const addressResponse = await instance.get(`getalladdress`);
      const store_setting = await instance.get(`getstoresetting`);
      const p = await instance.get(`getproducts`);
      
        console.log(contact.data);
        res.render('contact',{ contact: contact.data, footer: footerResponse.data, address: addressResponse.data, store: store_setting.data, p: p.data})
    }catch(err){
        if(err.response){
        res.render('contact',{ contact : null  })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers) 
        }else if(err.requiest){
        res.render('contact',{ contact: null})
            console.log(err.requiest)
        }else{
        res.render('contact',{ contact: null})
            console.error('Error', err.message)
        }
    }      
}