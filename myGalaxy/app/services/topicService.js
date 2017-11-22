/*
*   Topic API Service from ganhuo
*   Introduce http://www.jianshu.com/p/f0ccd027247c
* */

import NetUitl from '../common/netUitl'
import React, { Component } from 'react';

export default class TopicService {
    async fetchCategoryList(params) {
        try {
            // 注意这里的await语句，其所在的函数必须有async关键字声明
            const url = `http://gank.io/api/data/${params.category}/${params.count}/${params.pages}`
            // console.log(url)
            let response = await fetch(url);
            let responseJson = await response.json();
            return responseJson;
        } catch(error) {
            console.error(error);
        }
    }
}
