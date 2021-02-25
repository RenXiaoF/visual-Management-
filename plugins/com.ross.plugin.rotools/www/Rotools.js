var cordova = require('cordova');
var exec = require('cordova/exec');

var ClassRotools= function () {
    this.downloadOptions={
        fnProgress:null,
        connTimeout:10*1000,
        readTimeout:10*1000
    };
};

ClassRotools.prototype.mkdirs=function(fullPath,fnSuccess,fnError){
    exec(fnSuccess,fnError, 'Rotools', 'mkdirs', [fullPath]);
    //console.log("exports.start()");
};

ClassRotools.prototype.fileExists=function(fullPath,fnSuccess,fnError){
    exec(fnSuccess,fnError, 'Rotools', 'fileExists', [fullPath]);
    //console.log("exports.start()");
};

ClassRotools.prototype.writeUtf8=function(filePath, data, fnSuccess,fnError){
    exec(fnSuccess,fnError, 'Rotools', 'writeUtf8', [filePath, data]);
    //console.log("exports.start()");
};

ClassRotools.prototype.readUtf8=function(filePath, fnSuccess,fnError){
    exec(fnSuccess,fnError, 'Rotools', 'readUtf8', [filePath]);
};

ClassRotools.prototype.readConfig=function(name, fnSuccess,fnError){
    exec(fnSuccess,fnError, 'Rotools', 'readConfig', [name]);
};

ClassRotools.prototype.download = function(serverUrl, filePath, fnSuccess, fnError) {
    var options=this.downloadOptions;
    var fnSuccessWrapper = function(result) {
        if (typeof result.total == "undefined") {
            fnSuccess(result.downloaded);
        }else if(options.fnProgress != null){//此处不能用this.options,因为此处this指向fnSuccessWrapper
            options.fnProgress(result.total, result.downloaded);
        }
    }
    exec(fnSuccessWrapper, fnError, 'Rotools', 'download', [serverUrl, filePath, options.connTimeout, options.readTimeout]);
};

var objRotools = new ClassRotools();
module.exports = objRotools;
