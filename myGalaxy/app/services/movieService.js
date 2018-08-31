import React, { Component } from 'react';
import BaseService from './baseService'
export default class MovieService extends BaseService{
    constructor() {
        super();
    }

    /*
    async GetMovieList(params) {
        try {
            // 注意这里的await语句，其所在的函数必须有async关键字声明
            let url = 'http://m.maoyan.com/movie/list.json'
            url = this.complexParams(url, params)
            // console.log(url)
            let response = await fetch(url);
            let responseJson = await response.json();
            return responseJson;
        } catch(error) {
            console.error(error);
        }
    }*/

    async GetMovieList(params) {
        try {
            let url = 'https://api.douban.com/v2/movie/in_theaters'
            url = this.complexParams(url, params)
            // console.log(url)
            let response = await fetch(url);
            let responseJson = await response.json();
            return responseJson;
        } catch(error) {
            console.error(error);
        }
    }
}