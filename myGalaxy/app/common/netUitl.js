import React, { Component } from 'react';

export default class NetUitl extends React.Component{
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static get(url,params,callback){
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        console.log('fetch请求')
        fetch(url,{
            method: 'GET',
            headers:{
                // "skipoauth": "true"
            },
        })
            .then((response) => {
                callback(response)
            }).done();
    }
    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static post(url,params,headers,callback){
        //fetch请求
        fetch(url,{
            method: 'POST',
            headers:{
                // 'skipoauth': "true",
            },
            body:JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            }) .done();
    }
}
