# petsgo

https://github.com/nordnet/cordova-universal-links-plugin/issues/131
https://github.com/firebase/firebaseui-web/issues/365
Fazer o de cima dentro da pasta platform/ios/ ...

https://mediatemple.net/blog/tips/quick-tip-debug-ios-safari-true-local-emulator-actual-iphoneipad/

 ------ ANDROID --------

1º Passo - Rodar o comando "npm install"

2º Passo - Rodar o comando "npm run build"

3º Passo - Instalar os plugins e interface a usar. (Usar Browser, Android e IOS)
rodar "cordova platform add android"

4º Passo - Irá dar um erro de "cannot read property 'manifest' of undefined" e precisará modificar a biblioteca cordova-universal-links-plugins. 

Path: plugins/cordova-universal-links-plugin/hooks/lib/android/manifestWriter.js. 

Na linha 21 substituir o código atual por "var pathToManifest = path.join(cordovaContext.opts.projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'AndroidManifest.xml');"

5º Passo - Rodar novamente "cordova platform add android". (Sempre que rodar o "npm install" irá precisar rodar novamente).

 --------------- IOS ----------------

6º Passo - Rodar o "cordova platform add ios" e irá dar um erro "Cannot find module '../../src/plugman/platforms/ios'", acessar a pasta plugins/cordova-universal-links-plugin/hooks/lib/ios/xcodePreferences.js e substituir o código da linha 135 até a 150 pelo código abaixo:

function loadProjectFile() {
  var platform_ios;
  var projectFile;
  try {
    // try pre-5.0 cordova structure
    platform_ios = context.requireCordovaModule('cordova-lib/src/plugman/platforms')['ios'];
    projectFile = platform_ios.parseProjectFile(iosPlatformPath());
  } catch (e) {
    try {
      // let's try cordova 5.0 structure
      platform_ios = context.requireCordovaModule('cordova-lib/src/plugman/platforms/ios');
      projectFile = platform_ios.parse(iosPlatformPath());
    } catch (e) {
      // try cordova 7.0 structure
      var iosPlatformApi = require(path.join(iosPlatformPath(), '/cordova/Api'));
      var projectFileApi = require(path.join(iosPlatformPath(), '/cordova/lib/projectFile.js'));
      var locations = (new iosPlatformApi()).locations;
      projectFile = projectFileApi.parse(locations);
    }
  }
  return projectFile;
}

7º Passo - Ir no caminho : platforms\ios\PetsGo\config.xml e substituir o código por:
"<preference name="CordovaWebViewEngine" value="CDVUIWebViewEngine" />"