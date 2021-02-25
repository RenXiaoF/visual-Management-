var alv_rotools=null;		//具通用功能的插件对象。
var alv_serverUrl=null;		//视频文件服务器URL，从config.xml中读取。
var alv_localDir=null;		//视频文件的本地存储目录，从config.xml中读取。
var alv_menuData=null;		//字符串类型,json格式的菜单数据。
var alv_selectedMenuItem=null;

//document.addEventListener("deviceready", onDeviceReady, false);
function alv_onDeviceReady(){
	console.log("onDeviceReady()");
	alv_rotools=cordova.plugins.Rotools;
	loadConfig();
}

function loadConfig(){
	alv_rotools.readConfig("AssemblyLineVideoServerUrl",
		function(value){
			if(value != null){
				alv_serverUrl=value;
				alv_rotools.readConfig("AssemblyLineVideoLocalDir",
					function(value){
						if(value != null){
							alv_localDir=value;
							alv_downloadMenuData();//全部成功，跳转到下一步
						}else{
							console.log("alv_localDir is null!");
						}
					},
					function(err){
						console.log("Failed to readconfig().");
					}
				);
			}else{
				console.log("alv_serverUrl is null!");
			}
		},
		function(err){
			console.log("Failed to readconfig().");
		}
	);
}

function alv_downloadMenuData(){
	$.ajax({
		url: alv_serverUrl+"menu_data.json",
		dataType: "json",
		cache: false,
		timeout: 1000,
		success: function (menuData, status, xhr) {
			//console.log("success:"+result);
			alv_saveMenuData(menuData);
		},
		error: function (xhr, status, error){
			alv_info("菜单下载失败，启用本地菜单。");
			console.log("error:" + error);
			alv_loadMenuData();
		}
	});
}

function alv_saveMenuData(menuData){
	var filePath=alv_localDir+"menu_data.json";
	alv_rotools.writeUtf8(
		filePath,
		menuData,//JSON.stringify(menuData)
		function(okInfo){//Success function
			console.log("okInfo:"+okInfo);
			alv_loadMenuData();
		},
		function(errorInfo){//Error function
			console.log("saveMenuData, errorInfo:"+errorInfo);
		}
	);
}

function alv_loadMenuData(){
	var filePath=alv_localDir+"menu_data.json";
	alv_rotools.readUtf8(
		filePath,
		function(data){//Success function
			console.log("read successfully.");
			alv_menuData=JSON.parse(data);
			alv_buildMenu();
		},
		function(errorInfo){//Error function
			console.log("loadMenuData, errorInfo:"+errorInfo)
		}
	);
}

function alv_buildMenu(){
	var menu="<ul>";
	console.log("buildMenu()");
	for(var i in alv_menuData){
		var topLevel=alv_menuData[i];
		menu+="<li>";
		menu+=topLevel.title;
		menu+="<ul>";
		for(var j in topLevel.video){
			var secondLevel=topLevel.video[j];
			menu+="<li>";
			menu+="<u onclick=alv_checkVideo(this,"+i+","+j+")>"+secondLevel.title+"</u>";
			menu+="</li>";
		}
		menu+="</ul>";
		menu+="</li>";
	}
	menu+="</ul>";
	$("#divMenu").html(menu);
}

function alv_checkVideo(menuItem,i,j){
	var topLevel=alv_menuData[i];
	var secondLevel=topLevel.video[j];
	var file=secondLevel.file;
	var player=$("#player")[0];
	player.pause();
	alv_rotools.fileExists(
		alv_localDir+file,
		function(successInfo) {
			alv_selectVideo(menuItem,file);
		},
		function(errorInfo){
			console.log(file+" doesn't exists.");
			alv_downloadVideo(menuItem, file, secondLevel.url);
		}
	);
}

function alv_downloadVideo(menuItem, file, videoUrl){
	var filePath=alv_localDir+file;
	alv_setVideoTitle("正在下载"+file+"......");
	alv_rotools.downloadOptions.connTimeout=5*1000;
	alv_rotools.downloadOptions.fnProgress=function(total, downloaded){
		var rate=downloaded*100/total;
		var title="正在下载"+file+"......("+rate.toFixed(0)+"%)";
		alv_setVideoTitle(title);
	};
	alv_rotools.download(
		videoUrl,
		filePath,
		function(downloaded){
			console.log("Download successfully.");
			alv_selectVideo(menuItem,file);
		},
		function(error){
			alv_setVideoTitle(file+"下载失败。");
			console.log("Download error:"+error);
		}
	);
}

function alv_selectVideo(menuItem,file){
	var player=$("#player")[0];
	player.src="file://"+alv_localDir+file;
	menuItem.className="selectedItem";
	if(alv_selectedMenuItem!=null){
		alv_selectedMenuItem.className="";
	}
	alv_selectedMenuItem=menuItem;
	alv_setVideoTitle(menuItem.innerText);
	player.play();
}

function alv_setVideoTitle(title){
	$("#divVideoTitle").html(title);
}

function alv_info(msg){
	$("#divInfo").html(msg);
}

