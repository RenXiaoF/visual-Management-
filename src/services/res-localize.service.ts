import { Injectable } from '@angular/core';

declare var cordova: any;

// 本地化资源的使用对象，必须具有localizeResCallback(result:boolean, data:string)方法
var rls_user = null;

// 本地资源url前缀，固定不变
const rls_local_protocol = 'file:// ';

// 具通用功能的插件对象。
var rls_rotools = null;

// 从config.xml中读取，视频文件的服务器url左边固定不变的那部分，url剩余部分为资源文件的目录和文件名。
// 假设视频资源url为http:// qnattongniu.rossai.cn/res/video/A50.mp4，
// 其中http:// qnattongniu.rossai.cn/res/这部分不会随资源文件名或类型变化而变化，
// 则rls_ServerResUrlRoot应该等于http:// qnattongniu.rossai.cn/res/,注意以'/'结尾。
var rls_ServerResUrlRoot = null;

// 从config.xml中读取，视频文件的本地存储目录。
var rls_LocalResDirRoot = null;

function rls_onDeviceReady() {
  console.log('rls_onDeviceReady()');
  rls_rotools = cordova.plugins.Rotools;
  rls_loadConfig();
}

// 从config.xml文件中读取ServerResUrlRoot和LocalResDirRoot配置
function rls_loadConfig() {
  rls_rotools.readConfig('ServerResUrlRoot',
    function (value) {
      rls_ServerResUrlRoot = value;
      rls_rotools.readConfig('LocalResDirRoot',
        function (value) {
          if (value.endsWith('/')) {
            rls_LocalResDirRoot = value;
          } else {
            rls_LocalResDirRoot = value + '/';
          }
        },
        function (err) {
          console.log('Failed to read LocalResDirRoot in config.xml.');
        }
      );
    },
    function (err) {
      console.log('Failed to read ServerResUrlRoot in config.xml.');
    }
  );
}

function rls_localizeRes(serverResUrl) {
  var localResPath = rls_getLocalResPath(serverResUrl);
  if (localResPath == null) {
    rls_user.localizeResCallback(false, '001: Bad server res url.');
    return;
  }

  var pos = localResPath.lastIndexOf('/');
  var localResDir = localResPath.substr(0, pos);

  rls_rotools.mkdirs(localResDir,
    function (ok) {
      rls_rotools.fileExists(
        localResPath,
        function (successInfo) {
          // 如果本地资源存在，则直接将转换后的本地资源url传给调用者。
          rls_user.localizeResCallback(true, rls_local_protocol + localResPath);
        },
        function (errorInfo) {
          //  先播放线上资源
          //  window['epInstance']['emit']('getFile', serverResUrl);
          // 如果本地资源不存在，则下载
          rls_downloadRes(serverResUrl, localResPath);
        }
      );
    },
    function (err) {
      console.log('Failed to mkdirs: ' + localResDir);
    }
  );
}

function rls_downloadRes(serverResUrl, localResPath) {
  rls_log('正在下载' + localResPath + '......');
  rls_rotools.downloadOptions.connTimeout = 5 * 1000;
  rls_rotools.downloadOptions.fnProgress = function (total, downloaded) {
    var rate = downloaded * 100 / total;
    var title = '正在下载' + localResPath + '......(' + rate.toFixed(0) + '%)';
    // rls_log(title);  // 此输出过于频繁，一般要屏蔽，进度表达功能以后可以根据需要向外提供。
  };
  rls_rotools.download(
    serverResUrl,
    localResPath,
    function (downloaded) {
      console.log('Download ' + localResPath + ' successfully.');
      window['epInstance']['emit']('getFile', rls_local_protocol + localResPath);
      // 如果下载成功，则将本地资源url传给调用者。
      rls_user.localizeResCallback(true, rls_local_protocol + localResPath);
    },
    function (error) {
      rls_log(localResPath + '下载失败, error:' + error);
      rls_user.localizeResCallback(false, '002: 下载失败。');
    }
  );
}

function rls_getLocalResPath(serverResUrl) {
  // if (!serverResUrl.startsWith(rls_ServerResUrlRoot)) {
  //   return null;
  // }
  // var serverResUrlRight = serverResUrl.substr(rls_ServerResUrlRoot.length);
  // return rls_LocalResDirRoot + serverResUrlRight;
    if (serverResUrl.indexOf('.rossai.cn/') < 0) {
        return null;
    }
    var serverResUrlRight = serverResUrl.split('.rossai.cn/')[1];

    return rls_LocalResDirRoot + serverResUrlRight;
}

function rls_log(info) {
  console.log(info);
}

@Injectable({
  providedIn: 'root'
})
export class ResLocalizeService {
  private serviceUser: any = null;
  public CallBack: any = null;  // 回调函数

  // 注意服务不支持OnInit()
  constructor() {
    console.log('ResLocalizeService.constructor()');
    rls_user = this;
    document.addEventListener('deviceready', rls_onDeviceReady, false); // gotter@163.com
  }

  localizeRes(serverResUrl: string, serviceUser: any) {
    this.serviceUser = serviceUser;
    rls_localizeRes(serverResUrl);
  }

  localizeResCallback(result: boolean, data: string) {
    this.serviceUser.localizeResCallback(result, data);
    if (this.CallBack) {
        this.CallBack(result, data);
    }
  }

  // localizeResCallbackFunction 回调函数处理
  localizeResFunc(serverResUrl: string, call_back: object) {
      rls_localizeRes(serverResUrl);
      this.CallBack = call_back;
  }
}
