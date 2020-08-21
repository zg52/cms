/*
 * @Author: your name
 * @Date: 2020-08-13 11:10:46
 * @LastEditTime: 2020-08-21 15:11:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\assets\js\constants.js
 */
export const TEST_FLAG = process.env.NODE_ENV === "development";

export const __INTERFACEURL__ = TEST_FLAG ? "/api" : "";

export const __STATIC_IMG_URL__ = "http://xwdjavatest.oss-cn-beijing.aliyuncs.com/";

export const UPLOAD_URL = TEST_FLAG ? "/api" : "";
