package com.ross.plugin.rotools;


import android.net.Uri;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.apache.cordova.CordovaResourceApi;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.Closeable;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;

/**
 * This class echoes a string called from JavaScript.
 */
public class Rotools extends CordovaPlugin {
    final String TAG = "Rotools";
    final int MAX_BUFFER_SIZE = 16*1024;

    private CallbackContext mCallbackContext = null;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("mkdirs")) {
            return mkdirs(args,callbackContext);
        }
        if (action.equals("fileExists")) {
            return fileExists(args,callbackContext);
        }
        if (action.equals("writeUtf8")) {
            return writeUtf8(args,callbackContext);
        }
        if (action.equals("readUtf8")) {
            return readUtf8(args,callbackContext);
        }
        if (action.equals("readConfig")) {
            return readConfig(args,callbackContext);
        }
        if (action.equals("download")) {
            download(args,callbackContext);
            return true;
        }
        return false;
    }

    boolean fileExists(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String fullPath=args.getString(0);
        File file=new File(fullPath);
        if(file.exists()) {
            callbackContext.success("File exists.");
        }else{
            callbackContext.error("File doesn't exist.");
        }
        return true;
    }

    boolean mkdirs(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String fullPath=args.getString(0);
        //log("fullPath:"+fullPath);
        File file=new File(fullPath);
        if(file.exists()) {
            callbackContext.success("Directory exists.");
        }else{
            if(file.mkdirs()){
                callbackContext.success("mkdirs successfully.");
            }else{
                callbackContext.error("Failed to mkdir.");
            }
        }
        return true;
    }


    boolean writeUtf8(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try{
            String filePath=args.getString(0);
            String data=args.getString(1);
            FileOutputStream fos=new FileOutputStream(filePath);
            OutputStreamWriter osw=new OutputStreamWriter(fos,"utf8");
            osw.write(data);
            osw.close();
            fos.close();
            callbackContext.success("writeUtf8 successfully.");
        }catch(Exception err){
            callbackContext.error("Failed to writeUtf8.");
        }
        return true;
    }

    boolean readUtf8(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try{
            String filePath=args.getString(0);
            File file= new File(filePath);
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(new FileInputStream(file), "UTF8"));
            StringBuffer sb=new StringBuffer();
            char[] buf=new char[1024*8];
            while (true) {
                int len=reader.read(buf);
                if(len<1){
                    break;
                }
                sb.append(buf,0,len);
            }
            reader.close();
            callbackContext.success(sb.toString());
        }catch(Exception err){
            callbackContext.error("Failed to readUtf8.");
        }
        return true;
    }

    boolean readConfig(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try{
            String name=args.getString(0);
            String value=preferences.getString(name,null);
            if(value == null){
                callbackContext.error("Failed to readConfig.");    
            }else{
                callbackContext.success(value);
            }
        }catch(Exception err){
            callbackContext.error("Failed to readConfig.");
        }
        return true;
    }

    private void download(JSONArray args, CallbackContext callbackContext) throws JSONException {
        CordovaResourceApi resourceApi = webView.getResourceApi();
        String serverUrl= args.getString(0);
        String filePath= args.getString(1);
        int connTimeout=args.getInt(2);
        int readTimeout=args.getInt(3);
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                HttpURLConnection connection = null;
                PluginResult result = null;
                FileOutputStream os=null;
                InputStream is=null;
                try {
                    connection = resourceApi.createHttpConnection(Uri.parse(serverUrl));
                    connection.setRequestMethod("GET");
                    connection.setConnectTimeout(connTimeout);
                    connection.setReadTimeout(readTimeout);
                    connection.connect();
                    // write bytes to file
                    int total=connection.getContentLength();
                    byte[] buffer = new byte[MAX_BUFFER_SIZE];
                    int bytesRead = 0;
                    int downloaded=0;
                    os= new FileOutputStream(filePath);
                    is=connection.getInputStream();
                    while ((bytesRead = is.read(buffer)) > 0) {
                        downloaded+=bytesRead;
                        os.write(buffer, 0, bytesRead);
                        // Send a progress event.
                        JSONObject progress= new JSONObject();
                        progress.put("total",total);
                        progress.put("downloaded",downloaded);
                        PluginResult progressResult = new PluginResult(PluginResult.Status.OK, progress);
                        progressResult.setKeepCallback(true);
                        callbackContext.sendPluginResult(progressResult);
                    }
                    JSONObject progress= new JSONObject();
                    progress.put("downloaded",downloaded);
                    PluginResult progressResult = new PluginResult(PluginResult.Status.OK, progress);
                    callbackContext.sendPluginResult(progressResult);
                    is.close();
                    os.close();
                } catch (Exception e) {
                    callbackContext.error(e.getMessage());
                    e.printStackTrace();
                } finally {
                    safeClose(is);
                    safeClose(os);
                }
            }
        });
    }

    void safeClose(Closeable stream) {
        if (stream != null) {
            try {
                stream.close();
            } catch (IOException e) {
            }
        }
    }

    @Override
    public void onDestroy() {
        //unregister();
        super.onDestroy();
    }

    void log(String info) {
        LOG.i(TAG, info);
    }
}

