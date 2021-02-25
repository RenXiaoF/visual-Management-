
/*----------------------------------------文件服务器地址----------------------------------------*/

// export const FILE_SERVE_URL = 'http://yly.me'; // 调样式,打包apk  true
// export const FILE_SERVE_URL = 'http://attongniu.rossai.cn';  // 铜牛广告机(废弃)
// export const FILE_SERVE_URL = 'https://cloudpf.weunit.cn'; // 衣链云老项目(废弃)
export const API_SERVE_URL = 'http://ylyentp.rossai.cn/';     // 衣链云企业项目
export const FILE_SERVE_URL = 'http://atyifengda.rossai.cn/';    // 溢丰达静态资源

/*----------------------------------------后台Api地址----------------------------------------*/

export const APP_VERSION_SERVE_URL = 'http://yly.me/Advertisingmachine/'; // 测试环境

// export const APP_ONLINE_SERVE_URL = 'https://cloudpf.weunit.cn/Advertisingmachine/'; // 线上环境，衣链云老项目
// export const APP_ONLINE_SERVE_URL = 'http://attongniu.rossai.cn/Advertisingmachine/'; // 铜牛广告机
export const APP_ONLINE_SERVE_URL = 'http://ylyentp.rossai.cn/Advertisingmachine/'; // 线上环境，衣链云企业项目


export const IS_DEBUG = false; // 是否开发(调试)模式
// export const IS_DEBUG = true; // 是否开发(调试)模式

export const APP_MES_SERVE_URL = 'http://www.rossai.com.cn:6790/ross/post/cloud/'; // 云MES系统请求地址
export const APP_CAFE_SERVE_URL = 'http://www.rossai.com.cn:6790/ross/post/'; // 咖啡吧请求地址

export const LOGIN_PWD = true; // 是否启用密码登陆,调试时使用，勿删

export const DEFAULT_AVATAR = 'assets/img/null.png'; // 用户默认头像
export const DEFAULT_GOODS = 'assets/img/null.png'; // 默认商品图
export const DEFAULT_GOODS_IMG = 'assets/img/null.png'; // 默认商品图
export const DEFAULT_NUM = '0'; // 默认数量
export const DEFAULT_VAL = '无'; // 默认值
export const PAGE_SIZE = 5; // 默认分页大小
export const IMAGE_SIZE = 1024; // 拍照/从相册选择照片压缩大小
export const QUALITY_SIZE = 94; // 图像压缩质量，范围为0 - 100
export const REQUEST_TIMEOUT = 20000; // 请求超时时间,单位为毫秒

export const DOWNLOAD_QRCODE = 'assets/download_qr_code.png'; // 默认下载app二维码
export const DOWNLOAD_URL = 'http://www.gdsplx.com/apps/app1202.apk'; // 默认下载地址

export const FUNDEBUG_API_KEY = '1b2d6aca0444d09d2ce2635f15587281054590d96b65ccaa15b5cd0a1d4c3ae1'; // 去https:// fundebug.com/申请key

export const USE_TITLE = true; //
// export const USE_TITLE = false; //

// code push 部署key
export const CODE_PUSH_DEPLOYMENT_KEY = {
  'android': {
    'Production': 'i0LgJRugiIfjVYTgmXs9go45Xc7g26690215-d954-4697-a879-90e0c4612b59',
    'Staging': 'WY29_Zyq_hg0eB3TSTGaKRSKPE6k26690215-d954-4697-a879-90e0c4612b59'
  },
  'ios': {
    'Production': 'kn3VJ28z0hB_zQYnW-KnblldnBzN26690215-d954-4697-a879-90e0c4612b59',
    'Staging': 'SRoxClVMoed8SgwIRxeVCPWx26Fk26690215-d954-4697-a879-90e0c4612b59'
  }
};
// 存储本地信息  key
export const APP_CONFIG = {
  USER_KEY: '_user',
};
// 二级页面前后端交互唯一 key
export const SECOND_KEY = {
  Brand:   'brand',
  Process: 'process',
  Fabric:  'fabric',
  Server:  'server',
  Design:  'design',
  Factory:  'factory',
};
