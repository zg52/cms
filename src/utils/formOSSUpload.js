/*eslint-disable*/
import axios from 'axios';
// const __INTERFACEURL__ = 'http://web.api.bestmath.cn/';
import { UPLOAD_URL } from '@/assets/js/constants';
import { getToken } from '@/utils/auth'
import querystring from 'querystring';
/*upload使用说明：upload需要一个option参数，里面包括了必要的设置和各种事件回调
  ***！！！用这个上传
        upload({
          interfaceUrl: '/admin/teacher/rest/v1/headImageParams',
          expireTime: 120,
          extention: 'png,gif,jpg,jpeg',
          fileEvent: (ev) => {
            console.log(ev);
          },
          progress: (ev) => {
            console.log(ev);
          },
          success: (ev) => {
            console.log(ev);
            this.detail.imagePhoto = ev.dir + ev.fileName;
          },
          error: (ev) => {
            console.log(ev);
          },
        })
        以下作废
upload({
        serviceUrl: '/teacher/rest/v1/headImageParams' // 后台兑换的接口
        type:"audio",//资源的文件类型，为了便于管理，必填，目前氛围audio,vedio,img,file，doc,ppt,pdf,xml等
        isSecrecy:true,//是否为加密文件。默认不传是一般文件，路径可直接访问。true加密，false不加密。 
        extention:"mp3,wmv",//允许的文件类型
        fileEvent:(file)=>{
            //file为表单选择的本地文件，可进行本地预览
        },
        progress:(ev)=>{
            //返回http上传进度的event，里面包含了进度loaded和total
            if(ev.loaded!=undefined&&ev.total!=undefined){
              percent = Math.floor(ev.loaded/ev.total*100);
            }
        },
        success:(data)=>{
            data={
                dir:
                fileName
            }
            //data里返回路径和文件名
            let fileSrc=data.dir+data.fileName;
        },
        error:(err)=>{
          alert(err);
        }
      });

    uploadCatchFile({
        type: 'mp4',
        fileName: 'myName',
        uploadType: 'video/mp4', // 上传的功能类型，例如录音：RECORD,临时图片资源：IMAGE,作为类型和minetype使用
        file: buffer, // 文件的buffer
        progress: ev => {
          if (ev.loaded != undefined && ev.total != undefined) {
            this.audioPercent = Math.floor((ev.loaded / ev.total) * 100);
          }
        },
        success: data => {
          this.isUploading = false;
          if (data.dir) {
            this.dataSource.audioSrc = data.dir + data.fileName;
          }
          console.log(this.dataSource);
        },
        error: err => {
          this.isUploading = false;
          console.log(err);
          if (this.dataSource.audioSrc) {
            this.dataSource.audioSrc = "";
          }
          alert(err);
        }
      });
*/
// "2ewpHj7P4G/NTNTJyphFNp2ePkQUjVD3pZNzWvDYpWE=";
export function upload(options) {
  let input = document.createElement('input');
  input.value = '';
  input.type = 'file';
  input.onchange = () => {
    let file = input.files[0];
    console.log(file);
    let typeArr = file.type.split('/');
    if (checkExtention(options.extention, typeArr[1])) {
      return false;
    }
    if (options.fileEvent) {
      options.fileEvent(file);
    }
    // if (
    //   options.type == undefined ||
    //   options.type == null ||
    //   options.type == ''
    // ) {
    //   alert('未设置上传的文件类型');
    //   return false;
    // }

    getPolicy(options.interfaceUrl, options.expireTime)
      .then(policyData => {
        formUpload(file, policyData.fileUrl, policyData.fileData, options);
      })
      .catch(err => {
        options.error(err);
      });
  };
  input.click();
}
export function uploadCatchFile(options) {
  let file = options.file;
  let params = {
    // bucketType: 1,
    // resourceType: 'AILesson/' + options.uploadPath + '/',
    // fileExt: ''
  };
  getPolicy(options.serviceUrl, options.uploadPath)
    .then(policyData => {
      formUpload(file, policyData.fileUrl, policyData.fileData, options);
    })
    .catch(err => {
      options.error(err);
    });
}

function checkExtention(extention, type) {
  if (extention != undefined && extention != '') {
    let ext = extention;
    let earr = extention.split(',');
    for (let i = 0; i < earr.length; i++) {
      earr[i] = earr[i].toLowerCase();
      console.log(earr[i], ext);
      if (ext.indexOf(earr[i]) == -1) {
        alert('文件格式只能是: ' + extention);
        return true;
      }
    }
  }
}

function getPolicy(serviceUrl, expireTime) {
  let p = new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${UPLOAD_URL}${serviceUrl}`,
      headers: {
        token: getToken()
      },
      params: {expireTime}
    })
      .then(result => {
        console.log(result);
        if (result.data.code === '200') {
          let data = result.data.data;
          let fileUrl = 'http://xwdjavatest.oss-cn-beijing.aliyuncs.com/';
          let fileData = {
            name: '',
            key: data.dir,
            policy: data.policy,
            OSSAccessKeyId: data.accessKeyId,
            success_action_status: '200', //让服务端返回200,不然，默认会返回204
            callback: data.callback,
            signature: data.signature
          };
          let policyData = {
            fileUrl: fileUrl,
            fileData: fileData
          };
          resolve(policyData);
        }
      })
      .catch(err => {
        reject('获取上传请求失败：' + err);
      });
  });
  return p;
}

function formUpload(file, fileUrl, fileData, callbacks) {
  let form = new FormData();
  let fileName;
  if (callbacks.fileName) {
    file = convertBufferToBlob(file, callbacks.uploadType);
    fileName = callbacks.fileName;
  } else if (file.name) {
    fileName = new Date().getTime() + random_string(10) + get_suffix(file.name);
  }
  console.log(file);
  form.append('name', fileName);
  form.append('key', fileData.key + fileName);
  form.append('policy', fileData.policy);
  form.append('OSSAccessKeyId', fileData.OSSAccessKeyId);
  form.append('success_action_status', fileData.success_action_status);
  if (fileData.callback) {
    form.append("callback",fileData.callback);
  }
  form.append('signature', fileData.signature);
  form.append('file', file);
  let xhr = new XMLHttpRequest();
  let action = fileUrl;
  xhr.open('POST', action);
  xhr.upload.onprogress = ev => {
    if (callbacks.progress) {
      callbacks.progress(ev);
    }
  };
  xhr.send(form);
  xhr.onreadystatechange = () => {
    // console.log(xhr);
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (callbacks.success) {
        let resultData = {
          dir: fileData.key,
          fileName: fileName
        };
        // console.log(resultData);
        callbacks.success(resultData);
      }
      // let resultObj = JSON.parse(xhr.responseText);
      //处理返回的数据......
    } else if (xhr.readyState == 4 && xhr.status != 200) {
      if (callbacks.error) {
        callbacks.error('上传文件失败');
      }
    }
  };
}

function random_string(len) {
  len = len || 32;
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

function get_suffix(filename) {
  let pos = filename.lastIndexOf('.');
  let suffix = '';
  if (pos != -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
}

function convertBufferToBlob(bytes, type) {
  return new Blob([bytes], {
    type: type
  });
}

function convertBase64UrlToBlob(urlData, type) {
  console.log(urlData.split(',')[0]);
  let bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
  //处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], {
    type: type
  });
}

// 获取oss资源url
export function getResourseUrl(params) {
  console.log(querystring.stringify(params));
  let p = new Promise((resolve, reject) => {
    axios({
      method: 'get',
      // baseURL: "http://192.168.1.130:9093",
      baseURL: __INTERFACEURL2__,
      url: 'common/resource/getResourseUrl?' + querystring.stringify(params),
      headers: {
        token: getToken()
      }
      // data: querystring.stringify(params)
    })
      .then(result => {
        resolve(result.data);
      })
      .catch(err => {
        reject('解析地址失败：' + err);
      });
  });
  return p;
}
