
import { Injectable } from '@angular/core';
import { Api, Utils } from './index';

@Injectable()
export class NewMsgCode {
    verifycode: any = {
        codetips: "获取验证码",
        countdown: 300,
        ifdisabled: false,
    }
    token;
    code;

    constructor(
        public api: Api,
    ) {

    }

    getCode(mobile) {
        if (Utils.isEmpty(mobile)) {
            return;
        }
        this.token = null;
        this.api.postFormData('user/send_sms', { mobile: mobile }).subscribe((res: any) => {
            // console.log(res);
            if (res.status == 1) {
                this.token = res.result;
                this.settime();
            } else {
            }
        }, (err) => {
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
                }
                resolv(ress);
            }, (err) => {
                reject(ress);
            });
        });
        return ress;
    }
    // 验证码登录，获取验证码
    getPhoneCode(mobile, scene) {
        if (Utils.isEmpty(mobile)) {
            return;
        }
        this.token = null;
        this.api.postFormData('user/send_sms', { mobile: mobile, scene: scene }).subscribe((res: any) => {
            if (res.status == 1) {
                this.settime();
            } else {
            }
        }, (err) => {
            console.log(err);
        });
    }

    // 倒计时
    settime() {
        this.verifycode.ifdisabled = true;
        this.verifycode.codetips = "重新获取(" + this.verifycode.countdown + "s)";
        let lock = setInterval(() => {
            this.verifycode.countdown--;
            this.verifycode.codetips = "重新获取(" + this.verifycode.countdown + "s)";
            if (this.verifycode.countdown == 0) {
                clearInterval(lock);
                this.verifycode.ifdisabled = false;
                this.verifycode.countdown = 300;
                this.verifycode.codetips = "获取验证码";
            }
        }, 1000);
    }

}
