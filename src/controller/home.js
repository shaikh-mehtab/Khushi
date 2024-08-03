const express = require("express");
const axios = require("axios");

const instance = axios.create({
    baseURL: 'http://khushi.cometdigisol.com/web-api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

exports.Home = async function (req, res, next) {
    try{
        const home = await instance.get(`getallhome`);
        const slider = await instance.get(`getallslider`);
        const testimonials = await instance.get(`getalltestimonial`);
        const fnf = await instance.get(`getallfnf`);
        const product = await instance.get(`getproducts`);
        const cv = await instance.get(`getallcore`);
        const footerResponse = await instance.get(`getallfooter`);
      const addressResponse = await instance.get(`getalladdress`);
      const store_setting = await instance.get(`getstoresetting`);
      const p = await instance.get(`getproducts`);


        
        console.log(home.data);
        res.render('home',{ home:home.data, slider: slider.data, testimonials: testimonials.data , fnf:fnf.data , product:product.data, cv:cv.data, footer: footerResponse.data, address: addressResponse.data, store: store_setting.data, p: p.data})
    }catch(err){
        if(err.response){
        res.render('home',{ home : null ,slider:null,testimonials:null,fnf:null,products:null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers) 
        }else if(err.requiest){
        res.render('home',{ home: null, slider: null, testimonials: null , fnf : null , products : null})
            console.log(err.requiest)
        }else{
        res.render('home',{ home: null, slider: null, testimonials: null , fnf : null , products:null})
            console.error('Error', err.message)
        }
    }      
}