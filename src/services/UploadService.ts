import { Injectable } from '@angular/core';
// import { FileUploader } from 'ng2-file-upload';
import { IS_DEBUG, APP_VERSION_SERVE_URL, APP_ONLINE_SERVE_URL } from './Constants';
import { GlobalData } from './GlobalData';

@Injectable()
export class UploadService {

  // private baseurl = 'http://www.tpshopbbc.com/Admin/Designer/imageUp';
  private baseurl: string;
  private _onobj;
  public uploaderobj = [{ obj: <any>null, upload: [{ alas: null, file: null }] }];
  public base64Image: string;
  public subUrl: string;

  //用于压缩图片的canvas
  canvas: any;
  ctx: any;
  //瓦片canvas
  tCanvas: any;
  tctx: any;
  maxsize = 100 * 1024;
  constructor(public globalData: GlobalData) {
    if (IS_DEBUG) {
      this.baseurl = APP_VERSION_SERVE_URL;
    } else {
      this.baseurl = APP_ONLINE_SERVE_URL;
    }
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.tCanvas = document.createElement("canvas");
    this.tctx = this.tCanvas.getContext("2d");
  }
  set onObj(value) {
    this._onobj = value;
  }
  get onObj() {
    return this._onobj;
  }

  set NewUploadImgObj(value) {
    let isin = false;
    // 创建一个上传对象
    // tslint:disable-next-line:prefer-const
    let upobj = this.getNewUploadImgObj(value.filename);
    // 添加上传文件
    upobj.addToQueue(value.file);
    upobj.queue[0].withCredentials = false;
    // 判断是否已有对象的上传文件
    this.uploaderobj.every((val, idx) => {

      let tih = { state: false, idx: null };
      if (val.obj === this.onObj) {
        val.upload.forEach((el, i) => {
          if (el.alas === value.filename) {
            tih.state = true;
            tih.idx = i;
          }
        });
        // 替换已有的上传图片
        if (tih.state) {
          val.upload.splice(tih.idx, 1, { alas: value.filename, file: upobj });
        } else {
          val.upload.push({ alas: value.filename, file: upobj });
        }
        isin = true;
        return false;
      } else {
        return true;
      }
    });
    if (isin === false) {
      this.uploaderobj.push({ obj: this.onObj, upload: [{ alas: value.filename, file: upobj }] });
    }
  }

  get UploadImgObj() {
    let uploadImgObj = [];
    this.uploaderobj.every((val, idx) => {
      if (val.obj === this.onObj) {
        uploadImgObj = val.upload;
        return false;
      } else {
        return true;
      }
    });
    return uploadImgObj;
  }

  getNewUploadImgObj(filename) {
    // tslint:disable-next-line:prefer-const
    let url = this.baseurl + 'Useroa/imageUp';
    if (this.subUrl) {
      url = this.baseurl + this.subUrl;
    }
    let prams = {
      url: url,
      method: 'post',
      additionalParameter: { 'filename': filename, 'dir': 'after_sale' },
      headers: [
        { name: 'IsApi', value: 'true' },
        { name: 'Token', value: this.globalData.token ? this.globalData.token : '' }
      ],
    };
    // return new FileUploader(prams);
  }

  clearongimgobj(fnm) {
    this.UploadImgObj.forEach((val, idx) => {
      if (val.alas === fnm) {
        this.UploadImgObj.splice(idx, 1);
      }
    });
  }

  compress(img): Promise<any> {

    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;

    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
      ratio = Math.sqrt(ratio);
      width /= ratio;
      height /= ratio;
    } else {
      ratio = 1;
    }

    this.canvas.width = width;
    this.canvas.height = height;

    //        铺底色
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    //如果图片像素大于100万则使用瓦片绘制
    var count;
    if ((count = width * height / 1000000) > 1) {
      count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片

      //            计算每块瓦片的宽和高
      var nw = ~~(width / count);
      var nh = ~~(height / count);

      this.tCanvas.width = nw;
      this.tCanvas.height = nh;

      for (var i = 0; i < count; i++) {
        for (var j = 0; j < count; j++) {
          this.tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

          this.ctx.drawImage(this.tCanvas, i * nw, j * nh, nw, nh);
        }
      }
    } else {
      this.ctx.drawImage(img, 0, 0, width, height);
    }


    return new Promise((resole, reject) => {
      /*        this.canvas.toBlob((blob) => {
              //return blob;
              console.log('压缩前：' + initSize);
              console.log('压缩后：' + blob.size);
              console.log('压缩率：' + ~~(100 * (initSize - blob.size) / initSize) + "%");
              this.tCanvas.width = this.tCanvas.height = this.canvas.width = this.canvas.height = 0;
              resole(blob);
              //return;
            },'image/jpeg',0.1); */
      var ndata = this.canvas.toDataURL('image/jpeg', 0.3);

      // console.log('压缩前：' + initSize);
      // console.log('压缩后：' + ndata.length);
      // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
      var newfile = this.dataURLtoFile(ndata, 'img.jpeg');

      this.tCanvas.width = this.tCanvas.height = this.canvas.width = this.canvas.height = 0;
      resole(newfile);
    });
    //进行最小压缩

  }

  fileCheck(file): Promise<any> {
    return new Promise((resole, reject) => {
      if (!/\/(?:jpeg|png|gif)/i.test(file.type)) {
        resole({ 'status': -1, 'msg': '不是有效图片' });
        //return {'status':-1,'msg':'不是有效图片'};
      }
      let reader = new FileReader();
      reader.onload = (res: any) => {
        //var result = this.result;
        let result = res.target.result;
        // console.log("獲取到圖片的base64:");
        // console.log(result);
        this.base64Image = result;
        let img = new Image();
        img.src = result;
        //如果图片大小小于100kb，则直接上传
        if (result.length <= this.maxsize) {
          img = null;
          let newfile = Object.setPrototypeOf([file], FileList);
          return resole({ 'status': 1, 'res': newfile });
          //upload(result, file.type, $(li));
          //return {'status':1,'res':result};
        }
        //      图片加载完毕之后进行压缩，然后上传
        if (img.complete) {
          this.compress(img).then((rs) => {
            img = null;
            let newfile = Object.setPrototypeOf([rs], FileList);
            return resole({ 'status': 1, 'res': newfile });
          });
          //return {'status':1,'res':data};
        } else {
          img.onload = () => {
            this.compress(img).then((rs) => {
              img = null;
              let newfile = Object.setPrototypeOf([rs], FileList);
              return resole({ 'status': 1, 'res': newfile });
            });
            //upload(data, file.type, $(li));
            //return {'status':1,'res':data};
          };
        }
      };
      reader.readAsDataURL(file);
    });
  }

  dataURLtoFile(dataurl, filename) {//将base64转换为文件
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

}
