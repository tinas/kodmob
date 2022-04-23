package com.kodmob;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.kodmob.modules.SplashScreen.SplashScreenModule;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "kodmob";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    setTheme(R.style.AppTheme);

    SplashScreenModule.show(this);

    super.onCreate(null);
  }
}
