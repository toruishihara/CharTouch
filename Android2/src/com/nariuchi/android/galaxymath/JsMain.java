package com.nariuchi.android.galaxymath;

import android.app.Activity;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebView;

public class GalaxyMathActivity extends Activity {
    private WebView wv;
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        WindowManager w = getWindowManager();
        Display d = w.getDefaultDisplay();
        DisplayMetrics metrics = new DisplayMetrics();
        d.getMetrics(metrics);

        Log.d("WIDTH: ", String.valueOf(d.getWidth()));
        Log.d("HEIGHT: ", String.valueOf(d.getHeight()));
        
        WindowManager windowmanager = (WindowManager)getSystemService(WINDOW_SERVICE);
        Display disp = windowmanager.getDefaultDisplay();
        int width = disp.getWidth();
        int height = disp.getHeight();
        Log.d("Java", "disp.w=" + width + " h=" + height);
        
        JsInterface jsInterface = new JsInterface();
        
        //get webview and enable js
        wv = (WebView) findViewById(R.id.web_view);
        wv.getSettings().setJavaScriptEnabled(true);
        wv.getSettings().setDomStorageEnabled(true);
        //add interface
        wv.addJavascriptInterface(jsInterface, "console");
        
        //load file
        wv.loadUrl("file:///android_asset/index.html");
        Log.d("Java", "wv.w=" + wv.getWidth() + " h=" + wv.getHeight());
    }
    @Override
    public void onStart() {
    	super.onStart();
        Log.d("Java", "wv2.w=" + wv.getWidth() + " h=" + wv.getHeight());
    }
    
    //javascript interface
    private class JsInterface{
    	public void log(String msg){
    		Log.d("JS", msg);
    	}
    }
}
