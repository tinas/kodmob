package com.kodmob.modules.SplashScreen;

import android.app.Activity;
import android.app.Dialog;
import android.os.Build;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.kodmob.R;

import java.lang.ref.WeakReference;

public class SplashScreenModule extends ReactContextBaseJavaModule {
    private static WeakReference<Activity> mainActivityRef;
    private static Dialog splashDialog;

    SplashScreenModule(@NonNull ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "SplashScreenModule";
    }

    @ReactMethod
    public void hide() {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null && mainActivityRef != null) {
            currentActivity = mainActivityRef.get();
        }

        if (currentActivity == null || splashDialog == null) {
            return;
        }

        final Activity activity = currentActivity;

        activity.runOnUiThread(()->{
            boolean isDestroyed = false;

            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                isDestroyed = activity.isDestroyed();
            }

            if(!activity.isFinishing() && !isDestroyed && splashDialog != null && splashDialog.isShowing()) {
                splashDialog.dismiss();
            }

            splashDialog = null;
        });
    }

    public static void show(@NonNull final Activity activity) {
        mainActivityRef = new WeakReference<>(activity);

        activity.runOnUiThread(()->{
            splashDialog = new Dialog(activity, R.style.Theme_AppCompat_Light_NoActionBar);
            splashDialog.setContentView(R.layout.launch_screen);
            splashDialog.setCancelable(false);

            if(!splashDialog.isShowing() && !activity.isFinishing()) {
                splashDialog.show();
            }
        });
    }
}
