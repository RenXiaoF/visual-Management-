
import { Injectable } from '@angular/core';
import { Api,  } from './api';
import { Utils } from './Utils';
// import { NativeService } from './NativeService';

@Injectable()
export class MsgCode {
    verifycode: any = {
        codetips: '获取验证码',
        countdown: 60,
        ifdisabled: false,
    }
    token;
    code;

    constructor(
        public api: Api,
        // public native: NativeService,
    ) {

    }

    getCode(mobile) {
        if (Utils.isEmpty(mobile)) {
            // this.native.showToastTips('请输入手机号码！');
            return;
        }
        this.token = null;
        this.api.postFormData('Index/sendMobileCheck', { phone: mobile }).subscribe((res: any) => {
            // console.log(res);
            if (res.status == 1) {
                // this.native.showToastTips(res.msg);
                this.token = res.result;
                this.settime();
            } else {
                // this.native.showToastTips(res.msg);
            }
        }, (err) => {
        });
    }
    // 验证码登录，获取验证码
    getPhoneCode(mobile, scene) {
        if (Utils.isEmpty(mobile)) {
            // this.native.showToastTips('请输入手机号码！');
            return;
        }
        // this.token = null;
        this.api.postFormData('user/send_sms', { mobile: mobile, scene: scene }).subscribe((res: any) => {
            if (res.status == 1) {
                // this.native.showToastTips('获取验证码成功!');
                this.verifycode.ifdisabled = true;
                this.settime();
            } else {
                // this.native.showToastTips(res.msg);
            }
        }, (err) => {
            console.log(err);
        });
    }
    async checkcode(mobile, code): Promise<any> {
        let ress = { status: -1, token: this.token }
        await new Promise((resolv, reject) => {
            this.api.postFormData('Index/verifyMobileCheck', { phone: mobile, code: code, token: this.token }).subscribe((res: any) => {
                // console.log(res);
                if (res.status == 1) {
                    ress.status = 1;
                } else {
                    // this.native.showToastTips(res.msg);
                }
                resolv(ress);
            }, (err) => {
                reject(ress);
            });
        });
        return ress;
    }

    // 倒计时
    settime() {
        this.verifycode.ifdisabled = true;
        this.verifycode.codetips = '重新获取(' + this.verifycode.countdown + 's)';
        let lock = setInterval(() => {
            this.verifycode.countdown--;
            this.verifycode.codetips = '重新获取(' + this.verifycode.countdown + 's)';
            if (this.verifycode.countdown == 0) {
                clearInterval(lock);
                this.verifycode.ifdisabled = false;
                this.verifycode.countdown = 60;
                this.verifycode.codetips = '获取验证码';
            }
        }, 1000);
    }

}
